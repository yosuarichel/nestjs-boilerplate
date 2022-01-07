import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CmsLocalStrategy } from '../../../../authentication/cms_local.strategy';
import { UtilsService, CmsAuthService } from '@app/services';
import { AuthController } from './auth.controller';
import { AdminModule } from '../../../services/admin/admin.module';

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PassportModule,
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: async (appConfig: ConfigService) => ({
                        secret: appConfig.get('common').jwt_secret,
                        signOptions: { expiresIn: '5m' },
                    }),
                    inject: [ConfigService],
                }),
                AdminModule,
            ],
            controllers: [AuthController],
            providers: [
                ConfigService,
                {
                    provide: CmsAuthService,
                    useValue: {
                        value: jest.fn(),
                    },
                },
                CmsLocalStrategy,
                UtilsService,
            ],
            exports: [CmsAuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
