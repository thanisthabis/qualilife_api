import { Controller, Get, HttpException, HttpStatus, Inject, Logger, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ResponseDTO } from "src/common/interfaces";
import { CHALLENGE } from "src/constants/error.message";
import { ChallengeModeService } from "./challenge_mode.service";



@Controller('challenge-mode')
export class ChallengeModeController  {
    private readonly logger = new Logger(ChallengeModeController.name);

    constructor(
        @Inject(ChallengeModeService.name) private readonly service: ChallengeModeService,
        private readonly configService: ConfigService,
    ) { }

    @Get('')
    async get() : Promise<any> {
        const res = await this.service.getAll()
        return new ResponseDTO<any[]>(res, "Success")
    }

    @Get(':id')
    async getById(@Param('id') id: string) : Promise<any> {
        if(!id) { throw new HttpException(CHALLENGE.FIND_BY_ID, HttpStatus.BAD_REQUEST) }
        const res = await this.service.getById(id)
        return new ResponseDTO<any>(res, "Success")
    }
}