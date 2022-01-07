import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (config: ConfigService) => {
                const dbConfig = config.get('db');
                return {
                    uri: `mongodb://${dbConfig.mongo_db.host}:${dbConfig.mongo_db.port}`,
                    auth: {
                        username: dbConfig.mongo_db.username,
                        password: dbConfig.mongo_db.password,
                    },
                    dbName: dbConfig.mongo_db.db,
                    // Add this line if you want to use auth and db name on uri params
                    // authSource: 'admin',
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class MongoModule {}
