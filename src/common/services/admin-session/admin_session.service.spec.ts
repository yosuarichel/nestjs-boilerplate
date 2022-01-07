import { Test, TestingModule } from '@nestjs/testing';
import { AdminSessionService } from './admin_session.service';

describe('AdminSessionService', () => {
    let service: AdminSessionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: AdminSessionService,
                    useValue: {
                        value: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AdminSessionService>(AdminSessionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
