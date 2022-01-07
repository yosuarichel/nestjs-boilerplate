import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: () => void) {
        console.info('body from middleware => ', req.body);
        next();
    }
}
