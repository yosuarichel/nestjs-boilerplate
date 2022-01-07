import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
    CmsAuthService,
    AdminSessionModule,
    AdminModule,
    UtilsModule,
    SettingModule,
    AdminRoleModule,
} from '@app/services';
import { CmsLocalStrategy } from '../../../authentication/cms_local.strategy';
import { CmsJwtStrategy } from '../../../authentication/cms_jwt.strategy';
import { CheckDuplicateAdminCreateMiddleware } from '@app/middlewares/cms/admin/check_duplicate_admin_create.middleware';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (appConfig: ConfigService) => ({
                secret: appConfig.get('common').jwt_secret,
                signOptions: { expiresIn: '1y' },
            }),
            inject: [ConfigService],
        }),
        AdminSessionModule,
        AdminModule,
        UtilsModule,
        SettingModule,
        AdminRoleModule,
    ],
    providers: [CmsAuthService, CmsLocalStrategy, CmsJwtStrategy],
    controllers: [],
    exports: [CmsAuthService],
})
export class CmsAuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckDuplicateAdminCreateMiddleware).forRoutes({
            path: 'v1.0/cms/auth/register',
            method: RequestMethod.POST,
        });
    }
}
