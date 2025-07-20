import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AccessControlModule } from "nest-access-control";
import * as Joi from "@hapi/joi";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { roles } from "./app.roles";
import { TYPEORM_CONFIG } from "./config/constants";
import databaseConfig from "./config/database.config";
import { CacheModule } from "@nestjs/cache-manager";
import { JobsModule } from "./jobs/jobs.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`, // .env.development
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production")
          .default("development"),
      }),
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
    UserModule,
    CacheModule.register({ isGlobal: true }),
    JobsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
