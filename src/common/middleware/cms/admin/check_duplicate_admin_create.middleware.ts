import { Injectable, NestMiddleware } from '@nestjs/common';
import { AdminService } from '@app/services';

@Injectable()
export class CheckDuplicateAdminCreateMiddleware implements NestMiddleware {
    constructor(private readonly adminService?: AdminService) {}
    async use(req: any, res: any, next: () => void) {
        if (req.body.email) {
            await this.adminService.checkExist(null, req.body.email);
        }
        next();
    }
}
