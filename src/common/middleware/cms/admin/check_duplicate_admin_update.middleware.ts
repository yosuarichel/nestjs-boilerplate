import { Injectable, NestMiddleware } from '@nestjs/common';
import { AdminService } from '@app/services';

@Injectable()
export class CheckDuplicateAdminUpdateMiddleware implements NestMiddleware {
    constructor(private readonly adminService?: AdminService) {}
    async use(req: any, res: any, next: () => void) {
        if (isNaN(req.params.id)) {
            return next();
        }
        if (req.body.email) {
            await this.adminService.checkExist(req.params.id, req.body.email);
        }
        next();
    }
}
