import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from './schema/challenge.schema';
import { ChallengeController } from './challenge.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserChallenge, UserChallengeSchema } from './schema/challenge_user.schema';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Challenge.name, schema: ChallengeSchema }, { name: UserChallenge.name, schema: UserChallengeSchema }])],
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule { }
