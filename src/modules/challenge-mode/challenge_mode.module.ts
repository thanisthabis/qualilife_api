import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ChallengeModeController } from "./challenge_mode.controller";
import { ChallengeModeService } from "./challenge_mode.service";
import { ChallengeMode, ChallengeModeSchema } from "./schema/challenge_mode.schema";

@Module({
    // imports: [TypeOrmModule.forFeature([User])],
    imports: [
      ConfigModule,
      MongooseModule.forFeature([{ name: ChallengeMode.name, schema: ChallengeModeSchema }])],
    controllers: [ChallengeModeController],
    providers: [ChallengeModeService]
  })
  export class ChallengeModeModule { }