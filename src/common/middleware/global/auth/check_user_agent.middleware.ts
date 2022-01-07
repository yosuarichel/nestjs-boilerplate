import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { UAParser } from 'ua-parser-js';
import {
    USER_AGENT_NOT_FOUND,
    INVALID_DEVICE,
} from 'src/common/constants/error_codes';

@Injectable()
export class CheckUserAgentMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: () => void) {
        const useragent = req.headers['user-agent'] || req.get('User-Agent');
        if (!useragent) {
            throw new BadRequestException({
                code: USER_AGENT_NOT_FOUND.code,
                message: USER_AGENT_NOT_FOUND.message,
            });
        }
        req.UA = UAParser(useragent);
        if (req.UA.device && req.UA.device.type !== 'mobile') {
            throw new BadRequestException({
                code: INVALID_DEVICE.code,
                message: INVALID_DEVICE.message,
            });
        }
        next();
    }
}
