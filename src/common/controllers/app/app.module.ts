import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ExternalApiModule, UtilsModule } from '@app/services';
import { RmqModule } from '@app/providers';

@Module({
    imports: [ExternalApiModule, RmqModule, UtilsModule],
    providers: [{ provide: 'SEQUELIZE', useExisting: Sequelize }],
    controllers: [],
    exports: [],
})
export class AppModule {}
