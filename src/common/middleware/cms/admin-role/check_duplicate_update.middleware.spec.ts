import { CheckDuplicateUpdateAdminRoleMiddleware } from './check_duplicate_update.middleware';

describe('CheckDuplicateUpdateAdminRoleMiddleware', () => {
    it('should be defined', () => {
        expect(new CheckDuplicateUpdateAdminRoleMiddleware()).toBeDefined();
    });
});
