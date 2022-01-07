import {
    ValidationPipe,
    VersioningType,
    UnprocessableEntityException,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as expressWinston from 'express-winston';
import * as Sentry from '@sentry/node';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VALIDATION_ERROR } from 'src/common/constants/error_codes';
import { MainModule } from './main.module';
import { ErrorResponseFilter } from '@app/filters';
import { WinstonLogger } from './winston.logger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(MainModule, {
        bodyParser: true,
    });
    const commonConfig = app.get(ConfigService).get('common');
    const queueConfig = app.get(ConfigService).get('queue');
    const fluentdConfig = app.get(ConfigService).get('fluentd');
    Sentry.init({ dsn: commonConfig.sentry_url });
    app.enableCors();
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
        expressWinston.logger({
            winstonInstance: new WinstonLogger().mongoLogger(fluentdConfig),
            meta: true, // optional: log meta data about request (defaults to true)
            msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
            colorize: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
        }),
    );
    app.enableVersioning({
        type: VersioningType.URI,
        prefix: commonConfig.api_version_prefix,
    });
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new ErrorResponseFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            skipMissingProperties: false,
            transform: true,
            exceptionFactory: (errors) => {
                const messages = errors.map((x) => ({
                    field: x.property,
                    value: `${x.value}`,
                    message: Object.values(x.constraints).join(', '),
                }));
                throw new UnprocessableEntityException({
                    code: VALIDATION_ERROR.code,
                    message: VALIDATION_ERROR.message,
                    result: messages,
                });
            },
        }),
    );

    // Init swagger documentation
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Nest Js API Documentation')
        .setDescription('Nest js documentation using swagger')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document, {
        explorer: true,
    });

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [
                `amqp://${queueConfig.rmq.user}:${queueConfig.rmq.password}@${queueConfig.rmq.host}`,
            ],
            queue: 'bills/callback',
            noAck: false,
            queueOptions: {
                durable: true,
            },
        },
    });
    await app.startAllMicroservices();

    await app.listen(commonConfig.port);
    // eslint-disable-next-line no-console
    console.log(
        `Application is running on ${await app.getUrl()} (${commonConfig.env})`,
    );
}
bootstrap();
