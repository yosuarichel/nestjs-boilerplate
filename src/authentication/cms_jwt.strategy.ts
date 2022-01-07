import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as moment from 'moment';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService, AdminSessionService, UtilsService } from '@app/services';
import { UNAUTHORIZED } from 'src/common/constants/error_codes';

@Injectable()
export class CmsJwtStrategy extends PassportStrategy(Strategy, 'CMS_JWT') {
    constructor(
        private readonly adminService: AdminService,
        private readonly adminSessionService: AdminSessionService,
        private readonly utilsService: UtilsService,
        readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('common').jwt_secret,
        });
    }

    async validate(payload: any) {
        // check if Admin in the token actually exist
        if (!payload.role_id || !payload.session || !payload.email) {
            throw new UnauthorizedException({
                code: UNAUTHORIZED.code,
                message: UNAUTHORIZED.message,
            });
        }
        await this.adminService.findOneByEmail(payload.email);
        const adminSession = await this.adminSessionService.findValidSession(
            payload.session,
        );
        if (!adminSession) {
            throw new UnauthorizedException({
                code: UNAUTHORIZED.code,
                message: UNAUTHORIZED.message,
            });
        }
        const isSessionExpire = this.utilsService.checkExpiredDate(
            moment().tz('Asia/Jakarta').toDate(),
            adminSession.expired_at,
        );
        if (isSessionExpire) {
            throw new UnauthorizedException({
                code: UNAUTHORIZED.code,
                message: UNAUTHORIZED.message,
            });
        }
        return payload;
    }
}
