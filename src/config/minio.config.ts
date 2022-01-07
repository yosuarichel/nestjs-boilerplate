import { registerAs } from '@nestjs/config';

export default registerAs('minio', () => ({
    host: process.env.BUCKET_HOST,
    secret: process.env.BUCKET_SECRET,
}));
