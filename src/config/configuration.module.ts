import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import common from './common.config';
import db from './db.config';
import fluentd from './fluentd.config';
import minio from './minio.config';
import smtp from './smtp.config';
import queue from './queue.config';
import cache from './cache.config';
import { validationSchema } from './validation';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`env/.env.${process.env.NODE_ENV}`],
            load: [common, db, fluentd, minio, smtp, queue, cache],
            validationSchema,
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class AppConfigModule {}
