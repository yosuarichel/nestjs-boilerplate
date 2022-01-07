import { Injectable, NestMiddleware } from '@nestjs/common';
import { AdminRoleService } from '@app/services';

@Injectable()
export class CheckDuplicateUpdateAdminRoleMiddleware implements NestMiddleware {
    constructor(private readonly adminRoleService?: AdminRoleService) {}
    async use(req: any, res: any, next: () => void) {
        if (isNaN(req.params.id)) {
            return next();
        }
        if (req.body.name) {
            await this.adminRoleService.checkExist(
                req.params.id,
                req.body.name,
            );
        }
        next();
    }
}
