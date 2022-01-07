import { CheckDuplicateCreateAdminRoleMiddleware } from './check_duplicate_create.middleware';

describe('CheckDuplicateCreateAdminRoleMiddleware', () => {
    it('should be defined', () => {
        expect(new CheckDuplicateCreateAdminRoleMiddleware()).toBeDefined();
    });
});
