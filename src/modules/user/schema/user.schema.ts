import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {

    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    password: string;
    @Prop()    
    email: string;
    @Prop()
    profileUrl: string;
    @Prop()
    roles: string[];
    @Prop()
    refreshToken: string;
    @Prop()
    refreshTokenExpires: Date;

    toObject(): any {
        return super.toObject({ getters: true, virtuals: false });
    }
}

export const UserSchema = SchemaFactory.createForClass(User);