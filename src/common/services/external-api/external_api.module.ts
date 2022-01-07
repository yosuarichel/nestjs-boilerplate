import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalApiService } from '@app/services';

@Module({
    imports: [HttpModule],
    providers: [ExternalApiService],
    controllers: [],
    exports: [ExternalApiService],
})
export class ExternalApiModule {}
