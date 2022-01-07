import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminRoleService } from '@app/services';
import { AdminRole } from '@app/models/pg';
import { CheckDuplicateCreateAdminRoleMiddleware } from '@app/middlewares/cms/admin-role/check_duplicate_create.middleware';
import { CheckDuplicateUpdateAdminRoleMiddleware } from '@app/middlewares/cms/admin-role/check_duplicate_update.middleware';

@Module({
    imports: [SequelizeModule.forFeature([AdminRole])],
    providers: [AdminRoleService],
    controllers: [],
    exports: [SequelizeModule, AdminRoleService],
})
export class AdminRoleModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CheckDuplicateCreateAdminRoleMiddleware)
            .forRoutes({
                path: 'v1.0/cms/admin-role',
                method: RequestMethod.POST,
            })
            .apply(CheckDuplicateUpdateAdminRoleMiddleware)
            .forRoutes({
                path: 'v1.0/cms/admin-role/:id',
                method: RequestMethod.PUT,
            });
    }
}
