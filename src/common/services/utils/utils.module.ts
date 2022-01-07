import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Module({
    imports: [],
    providers: [UtilsService],
    controllers: [],
    exports: [UtilsService],
})
export class UtilsModule {}
