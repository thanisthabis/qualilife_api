import { Controller, Inject, Body, Get, HttpException, HttpStatus, Param, Put, Patch, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CHALLENGE, USER } from "../../constants/error.message";
import { Roles } from '../auth/roles.decorator';
import { Challenge } from './schema/challenge.schema';
import { ResponseDTO } from 'src/common/interfaces';


@Controller('challenge')
export class ChallengeController  {
    private readonly logger = new Logger(ChallengeController.name);

    constructor(
        @Inject(ChallengeService.name) private readonly service: ChallengeService,
        private readonly configService: ConfigService,
    ) { }

    // GET - /user/1234
    @Roles('ADMIN')
    @ApiOperation({
        summary: "get all challenge"
    })
    @Get()
    async getAll(): Promise<ResponseDTO<Challenge[]>> {
        const challenges = await this.service.getAll();
        if (!challenges || challenges.length == 0) throw new HttpException(CHALLENGE.FIND, HttpStatus.NOT_FOUND);
        
        return new ResponseDTO<Challenge[]>(challenges);
    }

    @Get('random')
    async getRandom(): Promise<ResponseDTO<any>> {
        const data = await this.service.getRandom()

        return new ResponseDTO<any>(data, "Success")
    }


    @ApiOperation({
        summary: "get challenge By User ID"
    })
    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: string): Promise<ResponseDTO<any[]>> {
        if (!userId) throw new HttpException(USER.ID_NOT_FOUND, HttpStatus.PRECONDITION_FAILED);
        const challenge = await this.service.getChallengeByUserId(userId);
        if (!challenge) throw new HttpException(CHALLENGE.FIND_BY_ID, HttpStatus.NOT_FOUND);
        
        return new ResponseDTO<any[]>(challenge);
    }
    

    // GET - /user/1234
    
    @ApiOperation({
        summary: "get single challenge by Id"
    })
    @Get(':challengeId')
    async getById(@Param('challengeId') challengeId: string): Promise<ResponseDTO<Challenge>> {
        if (!challengeId) throw new HttpException(CHALLENGE.ID_NOT_FOUND, HttpStatus.PRECONDITION_FAILED);
        const challenge = await this.service.getChallengeById(challengeId);
        if (!challenge) throw new HttpException(CHALLENGE.FIND_BY_ID, HttpStatus.NOT_FOUND);
        
        return new ResponseDTO<Challenge>(challenge);
    }

    

    
}
