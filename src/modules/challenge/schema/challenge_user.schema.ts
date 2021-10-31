import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

@Schema({ collection: 'user_challenge', timestamps: true })
export class UserChallenge extends Document {

    @Prop()
    userId: string;
    @Prop()
    challengeId: string;
    @Prop()
    status: string;
    @Prop()    
    imgUrl: string;
    @Prop()
    isFinish: boolean;

    toObject(): any {
        return super.toObject({ getters: true, virtuals: false });
    }
}

export const UserChallengeSchema = SchemaFactory.createForClass(UserChallenge);