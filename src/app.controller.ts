import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { HealthCheckDTO } from './health-check.dto';
import { Public } from './modules/auth/jwt-public';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({
    summary: 'Return this API healthcheck report'
  })
  @Public()
  @Get()
  async healthcheck(): Promise<HealthCheckDTO> {
    return this.appService.healthcheck();
  }

}