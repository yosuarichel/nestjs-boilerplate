import { CheckDuplicateAdminCreateMiddleware } from './check_duplicate_admin_create.middleware';

describe('CheckDuplicateAdminCreateMiddleware', () => {
    it('should be defined', () => {
        expect(new CheckDuplicateAdminCreateMiddleware()).toBeDefined();
    });
});
