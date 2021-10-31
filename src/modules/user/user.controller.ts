import { Controller, Inject, Body, Get, HttpException, HttpStatus, Param, Put, Patch, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { USER } from "../../constants/error.message";
import { ErrorDTO, IUserContoller, ResponseDTO, UserViewDTO } from 'src/common/interfaces';
import { Roles } from '../auth/roles.decorator';


@Controller('user')
export class UserController implements IUserContoller {
    private readonly logger = new Logger(UserController.name);

    constructor(
        @Inject(UserService.name) private readonly service: UserService,
        private readonly configService: ConfigService,
    ) { }

    // GET - /user/1234
    @Roles('ADMIN')
    @ApiOperation({
        summary: "get all user"
    })
    @Get()
    async getAll(): Promise<ResponseDTO<UserViewDTO[]>> {
        const user = await this.service.getAll();
        if (!user || user.length == 0) throw new HttpException(USER.FIND, HttpStatus.NOT_FOUND);
        
        return new ResponseDTO<UserViewDTO[]>(user);
    }

    // GET - /user/1234
    
    @ApiOperation({
        summary: "get single user by userId"
    })
    @Get(':userId')
    async getById(@Param('userId') userId: string): Promise<ResponseDTO<UserViewDTO>> {
        if (!userId) throw new HttpException(USER.ID_NOT_FOUND, HttpStatus.PRECONDITION_FAILED);
        const user = await this.service.getUserById(userId);
        if (!user) throw new HttpException(USER.FIND_BY_ID, HttpStatus.NOT_FOUND);
        
        return new ResponseDTO<UserViewDTO>(user);
    }
}
