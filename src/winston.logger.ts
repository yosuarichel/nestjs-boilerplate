import * as Winston from 'winston';
import * as winstonHttp from 'winston-transport-http-stream';

export class WinstonLogger {
    mongoLogger(config: any) {
        return Winston.createLogger({
            level: 'info',
            transports: [
                new winstonHttp({
                    url: `${config.url}:${config.port}/${config.db}`,
                    options: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                }),
            ],
        });
    }
}
