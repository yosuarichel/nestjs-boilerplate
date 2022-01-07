import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
    pg_db: {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        db: process.env.POSTGRES_DB,
        test_db: process.env.POSTGRES_TEST_DB,
    },
    mongo_db: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        db: process.env.MONGO_DB,
        test_db: process.env.MONGO_TEST_DB,
    },
}));
