import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {}

    async setNewCache(key: string, value: string): Promise<any> {
        const prevCache = await this.cacheManager.get(key);
        if (prevCache) {
            await this.cacheManager.del(key);
        }
        const newCache = await this.cacheManager.set(key, value);
        return newCache;
    }

    async resetCache(): Promise<any> {
        const delPrevCache = await this.cacheManager.reset();
        return delPrevCache;
    }
}
