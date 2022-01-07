import { UNAUTHORIZED } from 'src/common/constants/error_codes';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CmsLocalAuthGuard extends AuthGuard('CMS_LOCAL') {
    handleRequest(err: any, user: any, info: any): any {
        if (err || !user) {
            if (info.name === 'Error') {
                throw new UnauthorizedException({
                    code: UNAUTHORIZED.code,
                    message: UNAUTHORIZED.message,
                });
            }
            throw new UnauthorizedException({
                code: info.name,
                message: info.message,
            });
        }
    }
}
