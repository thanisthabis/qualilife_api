import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChallengeMode } from "./schema/challenge_mode.schema";

@Injectable()
export class ChallengeModeService {
    constructor(
        @InjectModel(ChallengeMode.name) private model: Model<ChallengeMode>
    ) { }

    async getAll() : Promise<ChallengeMode[]> {
        const result = await this.model.find().exec().catch(value => {
            return null
        })

        return result
    }

    async getById(id: string) : Promise<ChallengeMode> {
        const result = await this.model.findById(id).exec().catch(value => {
            return null
        })

        return result
    }
}
