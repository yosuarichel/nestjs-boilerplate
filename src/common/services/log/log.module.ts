import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from '@app/models/mongo';
import { LogService } from '@app/services';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    ],
    providers: [LogService],
    controllers: [],
    exports: [MongooseModule, LogService],
})
export class LogModule {}
