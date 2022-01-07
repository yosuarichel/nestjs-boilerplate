import { CheckUserAgentMiddleware } from './check_user_agent.middleware';

describe('CheckUserAgentMiddleware', () => {
    it('should be defined', () => {
        expect(new CheckUserAgentMiddleware()).toBeDefined();
    });
});
