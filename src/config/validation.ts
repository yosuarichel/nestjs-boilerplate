import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('development', 'production', 'test', 'provision')
        .default('development'),
    PORT: Joi.number().default(4000),
    API_VERSION: Joi.string().default('1').description('API Version'),
    JWT_SECRET: Joi.string()
        .required()
        .description('JWT Secret required to sign'),
    POSTGRES_DB: Joi.string()
        .default('api')
        .description('Postgres database name'),
    POSTGRES_TEST_DB: Joi.string()
        .default('api-test')
        .description('Postgres database for tests'),
    POSTGRES_PORT: Joi.number().default(5432),
    POSTGRES_HOST: Joi.string().default('localhost'),
    POSTGRES_USERNAME: Joi.string()
        .required()
        .default('postgres')
        .description('Postgres username'),
    POSTGRES_PASSWORD: Joi.string()
        .allow('')
        .default('password')
        .description('Postgres password'),
    POSTGRES_SSL: Joi.bool()
        .default(false)
        .description('Enable SSL connection to PostgreSQL'),
    POSTGRES_CERT_CA: Joi.string().description('SSL certificate CA'), // Certificate itself, not a filename
})
    .unknown()
    .required();
