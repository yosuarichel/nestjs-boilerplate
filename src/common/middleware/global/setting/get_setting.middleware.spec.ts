import { GetSettingMiddleware } from './get_setting.middleware';

describe('GetSettingMiddleware', () => {
    it('should be defined', () => {
        expect(new GetSettingMiddleware()).toBeDefined();
    });
});
