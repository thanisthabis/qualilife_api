import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'challenge_mode', timestamps: true })
export class ChallengeMode extends Document {

    @Prop()
    name: string;
    @Prop()
    description: string;

    toObject(): any {
        return super.toObject({ getters: true, virtuals: false });
    }
}

export const ChallengeModeSchema = SchemaFactory.createForClass(ChallengeMode);