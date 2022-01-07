import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Admin, AdminSession, AdminRole, Setting } from '@app/models/pg';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: async (config: ConfigService) => {
                const dbConfig = config.get('db');
                const commonConfig = config.get('common');
                const dbObject = {
                    development: {
                        dialect: dbConfig.pg_db.dialect,
                        host: dbConfig.pg_db.host,
                        port: dbConfig.pg_db.port,
                        username: dbConfig.pg_db.username,
                        password: dbConfig.pg_db.password,
                        database: dbConfig.pg_db.db,
                    },
                    test: {
                        dialect: dbConfig.pg_db.dialect,
                        host: dbConfig.pg_db.host,
                        port: dbConfig.pg_db.port,
                        username: dbConfig.pg_db.username,
                        password: dbConfig.pg_db.password,
                        database: dbConfig.pg_db.test_db,
                    },
                    production: {
                        dialect: dbConfig.pg_db.dialect,
                        host: dbConfig.pg_db.host,
                        port: dbConfig.pg_db.port,
                        username: dbConfig.pg_db.username,
                        password: dbConfig.pg_db.password,
                        database: dbConfig.pg_db.db,
                    },
                };
                return {
                    ...dbObject[commonConfig.env],
                    synchronize: true,
                    sync: true,
                    logging: false,
                    models: [Admin, AdminSession, AdminRole, Setting],
                    autoLoadModels: false,
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class PostgresModule {}
