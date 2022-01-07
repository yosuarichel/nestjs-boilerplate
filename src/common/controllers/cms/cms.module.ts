import { Module } from '@nestjs/common';
import {
    UtilsModule,
    AdminModule,
    AdminRoleModule,
    CmsAuthModule,
    SettingModule,
    CacheModule,
    LogModule,
} from '@app/services';
import { SettingController } from './setting/setting.controller';
import { AdminRoleController } from './admin-role/admin_role.controller';
import { AdminController } from './admin/admin.controller';
import { AuthController } from './auth/auth.controller';
import { FileUploadModule } from '@app/providers';
import { LogController } from './log/log.controller';

@Module({
    imports: [
        FileUploadModule,
        UtilsModule,
        SettingModule,
        AdminRoleModule,
        AdminModule,
        CmsAuthModule,
        LogModule,
        CacheModule,
    ],
    providers: [],
    controllers: [
        SettingController,
        AdminRoleController,
        AdminController,
        AuthController,
        LogController,
    ],
    exports: [],
})
export class CmsModule {}
