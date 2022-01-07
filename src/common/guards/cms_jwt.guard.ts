import { UNAUTHORIZED } from 'src/common/constants/error_codes';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CmsJwtAuthGuard extends AuthGuard('CMS_JWT') {
    handleRequest(err: any, user: any, info: any): any {
        if (err) {
            throw new UnauthorizedException(err);
        }
        if (info) {
            throw new UnauthorizedException(info);
        }
        if (!user) {
            throw new UnauthorizedException({
                code: UNAUTHORIZED.code,
                message: UNAUTHORIZED.message,
            });
        }
        return user;
    }
}
