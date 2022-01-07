import { registerAs } from '@nestjs/config';

export default registerAs('queue', () => ({
    rmq: {
        user: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD,
        host: process.env.RABBITMQ_HOST,
    },
}));
