import { Module } from '@nestjs/common';
import { CacheService } from '@app/services';
import { RedisModule } from '@app/providers';

@Module({
    imports: [RedisModule],
    providers: [CacheService],
    controllers: [],
    exports: [CacheService],
})
export class CacheModule {}
