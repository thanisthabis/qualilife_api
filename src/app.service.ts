import { Injectable } from '@nestjs/common';
import { HealthCheckDTO } from './health-check.dto';
import env from './utils/env';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService,
    @InjectConnection() private readonly connection: Connection
  ) { }

  async healthcheck(): Promise<HealthCheckDTO> {
    return {
      buildNum: this.configService.get('BUILD_NUM'),
      status: 'ACTIVE',
      dbConnection: this.connection.readyState === 1 ? true : false,
      message: `
      MONGODB=${this.configService.get(env.MONGODB_DBNAME)}\n
      COSMODDB_USER=${this.configService.get(env.MONGODB_USER)}\n
      COSMOSDB_PASSWORD=XXX
      `
    };
  }
}
