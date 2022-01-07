import { Injectable, NestMiddleware } from '@nestjs/common';
import { SettingService } from '@app/services';

@Injectable()
export class GetSettingMiddleware implements NestMiddleware {
    constructor(private readonly settingService?: SettingService) {}
    async use(req: any, res: any, next: () => void) {
        const setting = await this.settingService.findOne(1, { raw: true });
        req.setting = setting;
        next();
    }
}
