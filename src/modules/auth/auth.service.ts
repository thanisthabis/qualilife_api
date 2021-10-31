import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    // constructor(private userService: UserService) { }
    constructor(@InjectModel(User.name)
    private model: Model<User>,

    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.model.findOne({ 'email': email })
            .select("_id email password firstName lastName roles")
            .exec();
        if (!user) {
            throw new HttpException({status: "ERR_USER_INVALID", message: "Email or Password invalid."}, HttpStatus.UNAUTHORIZED);
        }
        // const hash = await bcrypt.hash(password, 9)
        // console.log(hash)
        if (
            await bcrypt.compare(password, user.password)
            // password === user.password
        ) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException({status: "ERR_USER_INVALID", message: "Email or Password invalid."}, HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    async signPayload(payload: any) {
        // return sign(payload, process.env.SECRET_KEY, { expiresIn: 5000 });
        return sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
    }

    async sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        delete sanitized['refreshToken']
        delete sanitized['refreshTokenExpires']
        return sanitized;
    }

    async validate(payload: User, refresh_token: string) {
        const { email } = payload;
        const user =  await this.model.findOne({ 'email': email })
        .select("_id email firstName lastName refreshToken refreshTokenExpires")
        .exec();

        // console.log('validate refresh token user', user)
        if (refresh_token != user.refreshToken) {
            throw new UnauthorizedException({status: "ERR_AUTH_2", message: "Refresh token invalid."});
        }
        if (new Date() > (await user).refreshTokenExpires) {
            throw new UnauthorizedException({status: "ERR_AUTH_3", message: "Refresh token expired, return to login page."});
        }

        return await this.sanitizeUser(user);
    }

    async saveorupdateRefreshToke(user_id: string, refresh_token: string, refreshtoken_expires: Date): Promise<User> {
        const result = await this.model.updateOne(
            { _id: user_id} ,
            { $set: { refreshToken: refresh_token, refreshTokenExpires: refreshtoken_expires } }
        )
        console.log(result)
        return result
    }

    async generateRefreshToken(payload: any): Promise<string> {
        var randtoken = require('rand-token');
        var refreshToken = randtoken.generate(16);
        var expirydate = new Date();
        // expirydate.setDate(expirydate.getMinutes() + 3);
        expirydate.setHours(expirydate.getHours() + 48);
        // console.log(refreshToken)
        await this.saveorupdateRefreshToke(payload._id, refreshToken, expirydate);
        return refreshToken
    }

    async updateRefreshTokenExpired(payload: any, refresh_token: string): Promise<string> {
        var expirydate = new Date();
        // expirydate.setDate(expirydate.getMinutes() + 3);
        expirydate.setHours(expirydate.getHours() + 120);
        // console.log(refreshToken)
        await this.saveorupdateRefreshToke(payload._id, refresh_token, expirydate);
        return refresh_token
    }

}