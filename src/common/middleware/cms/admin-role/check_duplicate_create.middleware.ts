import { Injectable, NestMiddleware } from '@nestjs/common';
import { AdminRoleService } from '@app/services';

@Injectable()
export class CheckDuplicateCreateAdminRoleMiddleware implements NestMiddleware {
    constructor(private readonly adminRoleService?: AdminRoleService) {}
    async use(req: any, res: any, next: () => void) {
        if (req.body.name) {
            await this.adminRoleService.checkExist(null, req.body.name);
        }
        next();
    }
}
