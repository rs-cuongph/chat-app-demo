import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { ExtendedPrismaConfigService } from './services/prisma-config.service';
import { BullModule } from '@nestjs/bullmq';
import * as Joi from 'joi';
import configs from './configs';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import modules from '@modules/index';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        APP_FALLBACK_LANGUAGE: Joi.string().default('en').required(),
        APP_HEADER_LANGUAGE: Joi.string().default('en').required(),
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        JWT_REFRESH_IN: Joi.string().required(),
      }),
      isGlobal: true,
      load: [configs],
    }),
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      useClass: ExtendedPrismaConfigService,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ...modules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenGuard,
    },
  ],
})
export class AppModule {}
