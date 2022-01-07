import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SequelizeTransactionInterceptor implements NestInterceptor {
    constructor(
        @Inject('SEQUELIZE')
        private readonly sequelizeInstance?: Sequelize,
    ) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();
        const transaction: Transaction =
            await this.sequelizeInstance.transaction({
                // eslint-disable-next-line no-console
                logging: console.log, // Just for debugging purposes
            });
        req.transaction = transaction;
        return next.handle().pipe(
            tap(async () => {
                await transaction.commit();
            }),
            catchError(async (e) => {
                await transaction.rollback();
                throw e;
            }),
        );
    }
}
