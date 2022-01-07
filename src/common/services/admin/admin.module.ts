import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '@app/models/pg';
import { AdminService } from '@app/services';
import { CheckDuplicateAdminCreateMiddleware } from '@app/middlewares/cms/admin/check_duplicate_admin_create.middleware';
import { CheckDuplicateAdminUpdateMiddleware } from '@app/middlewares/cms/admin/check_duplicate_admin_update.middleware';

@Module({
    imports: [SequelizeModule.forFeature([Admin])],
    providers: [AdminService],
    controllers: [],
    exports: [SequelizeModule, AdminService],
})
export class AdminModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CheckDuplicateAdminCreateMiddleware)
            .forRoutes({ path: 'v1.0/cms/admin', method: RequestMethod.POST })
            .apply(CheckDuplicateAdminUpdateMiddleware)
            .forRoutes({
                path: 'v1.0/cms/admin/:id',
                method: RequestMethod.PUT,
            });
    }
}
