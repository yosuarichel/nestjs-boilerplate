import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from '@app/services';

describe('AdminsController', () => {
    let controller: AdminController;
    let service: AdminService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdminController],
            providers: [
                {
                    provide: AdminService,
                    useValue: {
                        value: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AdminController>(AdminController);
        service = module.get<AdminService>(AdminService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
