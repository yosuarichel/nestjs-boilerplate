import { SequelizeTransactionInterceptor } from './sequelize_transaction.interceptor';

describe('SequelizeTransactionInterceptor', () => {
    it('should be defined', () => {
        expect(new SequelizeTransactionInterceptor()).toBeDefined();
    });
});
