import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import env from './utils/env';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { JwtRoleGuard } from './modules/auth/jwt-role.guard';
import { ChallengeModule } from './modules/challenge/challenge.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cs: ConfigService) => ({
        uri: cs.get(env.MONGODB_CONNSTR)
        // uri: `mongodb://${cs.get(env.MONGODB_USER)}:${cs.get(env.MONGODB_PASSWORD)}@${cs.get(env.MONGODB_HOST)}:${cs.get(env.MONGODB_PORT)}/${cs.get(env.MONGODB_DBNAME)}?ssl=true&appName=@${cs.get(env.MONGODB_USER)}@`
        , useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule,
    ChallengeModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {provide: APP_GUARD,
    useClass: JwtRoleGuard}
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
