import { registerAs } from '@nestjs/config';

export default registerAs('fluentd', () => ({
    url: process.env.FLUENTD_URL,
    port: process.env.FLUENTD_PORT,
    db: process.env.FLUENTD_DB,
}));
