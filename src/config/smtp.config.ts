import { registerAs } from '@nestjs/config';

export default registerAs('smtp', () => ({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    username: process.env.SMTP_USERNAME,
    key: process.env.SMTP_KEY,
    email: process.env.EMAIL,
}));
