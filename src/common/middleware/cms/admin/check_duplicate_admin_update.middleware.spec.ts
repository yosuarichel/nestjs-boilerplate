import { CheckDuplicateAdminUpdateMiddleware } from './check_duplicate_admin_update.middleware';

describe('CheckDuplicateAdminUpdateMiddleware', () => {
    it('should be defined', () => {
        expect(new CheckDuplicateAdminUpdateMiddleware()).toBeDefined();
    });
});
