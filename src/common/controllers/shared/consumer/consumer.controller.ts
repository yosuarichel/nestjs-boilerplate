import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';

@ApiTags('Consumer')
@Controller('app/consumer')
export class ConsumerController {
    @EventPattern('platform_callback')
    async consumeData(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        // eslint-disable-next-line no-console
        console.log('== CONSUME DATA  ==', data);
        channel.ack(originalMsg);
        return;
    }
}
