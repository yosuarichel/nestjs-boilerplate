import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminSessionService } from '@app/services';
import { AdminSession } from '@app/models/pg';

@Module({
    imports: [SequelizeModule.forFeature([AdminSession])],
    providers: [AdminSessionService],
    controllers: [],
    exports: [SequelizeModule, AdminSessionService],
})
export class AdminSessionModule {}
