import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({
    id: true,
})
export class Log {
    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Date, required: true })
    created_at: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
