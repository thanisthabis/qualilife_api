import { Injectable } from '@nestjs/common';
import { Challenge } from './schema/challenge.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserChallenge } from './schema/challenge_user.schema';

@Injectable()
export class ChallengeService {
    user: any;

    constructor(
        @InjectModel(Challenge.name) private model: Model<Challenge>,
        @InjectModel(UserChallenge.name) private userChallengeModel: Model<UserChallenge>
    ) { }

    /**
        * Create a user 
        * @param userId give initial data in UserNewDTO in the request body
        * @returns A single-record array of UserNewDTO or an empty array if not found
    */

    async getAll(): Promise<Challenge[]> {
        const result = await this.model.find().exec();
        return result
    }

    async getChallengeById(challengeId: string): Promise<Challenge> {
        const result = await this.model.findById(challengeId).exec().catch(value => {
            return null
        })

        return result;
    }

    async getChallengeByUserId(userId: string): Promise<any[]> {
        // const result = await this.userChallengeModel.find({userId: userId}).populate('challengeDetail').exec().catch(value => {
        //     return null
        // })

        const result = await this.userChallengeModel.aggregate([
            {
                $match: {
                    userId: userId
                }
            }, {
                $lookup: {
                    from: "challenge", // collection to join
                    localField: "challengeId",//field from the input documents
                    foreignField: "_id",//field from the documents of the "from" collection
                    as: "challengeDetail"// output array field
                }
            }
        ]).catch(value => {
            return null
        })

        return result
    }
}
