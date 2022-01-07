import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppConfigModule } from './config/configuration.module';
import { LoggerMiddleware } from '@app/middlewares/global/logger/logger.middleware';
import { MongoModule, PostgresModule, RedisModule } from '@app/providers';
import { CmsModule } from './common/controllers/cms/cms.module';
import { AppModule } from './common/controllers/app/app.module';
import { SharedModule } from './common/controllers/shared/shared.module';

@Module({
    imports: [
        AppConfigModule,
        PostgresModule,
        RedisModule,
        MongoModule,
        CmsModule,
        AppModule,
        SharedModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
