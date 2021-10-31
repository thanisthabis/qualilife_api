import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'challenge', timestamps: true })
export class Challenge extends Document {

    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    level: string;
    @Prop()    
    point: number;
    @Prop()
    mode: string;

    toObject(): any {
        return super.toObject({ getters: true, virtuals: false });
    }
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);