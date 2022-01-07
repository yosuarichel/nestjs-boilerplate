import { UtilsModule } from '@app/services';
import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer/consumer.controller';

@Module({
    imports: [UtilsModule],
    providers: [],
    controllers: [ConsumerController],
    exports: [],
})
export class SharedModule {}
