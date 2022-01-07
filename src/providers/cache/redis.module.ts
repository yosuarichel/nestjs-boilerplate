import { CacheModule, Module } from '@nestjs/common';
import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        CacheModule.registerAsync<RedisClientOpts>({
            useFactory: async (config: ConfigService) => ({
                store: redisStore,
                host: config.get('cache').redis.host,
                port: config.get('cache').redis.port,
                ttl: config.get('cache').redis.ttl,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [],
    exports: [CacheModule],
})
export class RedisModule {}
