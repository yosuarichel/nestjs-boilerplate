import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    api_version: process.env.API_VERSION,
    api_version_prefix: process.env.API_VERSION_PREFIX,
    jwt_secret: process.env.JWT_SECRET,
    sentry_url: process.env.SENTRY_URL,
    upload_path: process.env.ASSETS_ORIGINAL_PATH,
}));
