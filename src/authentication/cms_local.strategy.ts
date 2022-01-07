import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AdminDto } from '@app/dto';
import { AdminRoleService, CmsAuthService } from '@app/services';

@Injectable()
export class CmsLocalStrategy extends PassportStrategy(Strategy, 'CMS_LOCAL') {
    constructor(
        private readonly authService: CmsAuthService,
        private readonly adminRoleService: AdminRoleService,
    ) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<AdminDto> {
        const admin = await this.authService.verifyAdmin(email, password);
        await this.adminRoleService.findOne(admin.role_id);
        return JSON.parse(JSON.stringify(admin));
    }
}
