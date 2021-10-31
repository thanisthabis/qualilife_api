import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserViewDTO } from 'src/common/interfaces';

@Injectable()
export class UserService {
    user: any;

    constructor(@InjectModel(User.name) private model: Model<User>) { }

    /**
        * Create a user 
        * @param userId give initial data in UserNewDTO in the request body
        * @returns A single-record array of UserNewDTO or an empty array if not found
    */

    async getAll(): Promise<UserViewDTO[]> {
        const result = await this.model.find().exec();
        return result.map(res=> {
            res.password = null
            res.refreshToken = null
            res.refreshTokenExpires = null

            return res
        })
    }

    async getUserById(userId: string): Promise<UserViewDTO> {
        const result = await this.model.findById(userId).exec().catch(value => {
            return null
        })
        if(result) {
            result.password = null
            result.refreshToken = null
            result.refreshTokenExpires = null
        }
        return result;
    }

    // constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    
    // async getAll(): Promise<UserViewDTO[]> {
    //     return periods = await this.userRepository.find();
    // }

    // async getUserById(userId: string): Promise<UserViewDTO> {
    //     return await this.userRepository.findId({userId})
    // }

    // async getAll(): Promise<any[]> {
    //     // GET relation with entity one-to-many | many-to-one.
    //     const data = await this.exampleRepository.find({ relations: ['exampleChilds'] });
    
    //     GET other entity with multi repo.
    //     const data = await this.exampleChildRepository.find({ relations: ['exampleChildChilds'] });
       
    //     const data = await getManager().query(
    //       `
    //       SELECT  e1.id,e1.firstName,e1.lastName,e1.email,e1.age,e2.attr,e3.* AS data
    //         FROM "example" as e1
    //         JOIN "example_child" as e2
    //           ON e2.id = e1.example_child_id
    //           JOIN "example_child_child" as e3
    //           ON e2.example_child_child_id = e3.id ;
    //         `
    //     );
    
    //     //GET by query and multiple join with property to class and getAll.
    //     const data = await this.exampleRepository
    //       .createQueryBuilder("t1")
    //       .innerJoinAndMapOne(
    //         "t1.ec",
    //         ExampleChild,
    //         "t2",
    //         "t1.example_child_id = t2.id"
    //       )
    //       .innerJoinAndMapOne(
    //         "t2.ecc",
    //         ExampleChildChild,
    //         "t3",
    //         "t2.example_child_child_id = t3.id"
    //       )
    //       .getMany();
    
    //     return data;
    //   }
}
