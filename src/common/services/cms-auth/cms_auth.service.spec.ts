import { Test, TestingModule } from '@nestjs/testing';
import { CmsAuthService } from './cms_auth.service';

describe('CmsAuthService', () => {
    let service: CmsAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: CmsAuthService,
                    useValue: {
                        value: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CmsAuthService>(CmsAuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
