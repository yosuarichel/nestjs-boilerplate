import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SettingService } from '@app/services';
import { Setting } from '@app/models/pg';

@Module({
    imports: [SequelizeModule.forFeature([Setting])],
    providers: [SettingService],
    controllers: [],
    exports: [SequelizeModule, SettingService],
})
export class SettingModule {}
