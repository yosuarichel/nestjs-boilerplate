import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [
        {
            provide: 'CALLBACK_PROVIDER',
            useFactory: (configService: ConfigService) => {
                const queueConfig = configService.get('queue');

                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            `amqp://${queueConfig.rmq.user}:${queueConfig.rmq.password}@${queueConfig.rmq.host}`,
                        ],
                        queue: 'test/callback',
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: ['CALLBACK_PROVIDER'],
})
export class RmqModule {}
