import { Module } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { JobsController } from "./jobs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { Job } from "./entities/job.entity";
import { JobSource } from "./entities/job-source.entity";
import { Location } from "./entities/location.entity";
import { Salary } from "./entities/salary.entity";
import { JobRequirement } from "./entities/job-requirements.entity";
import { JobTechnology } from "./entities/job-technology.entity";
import { JobsMappingService } from "./jobs-mapping.service";
import { JobsSchedulerService } from "./jobs-scheduler.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      JobRequirement,
      JobSource,
      JobTechnology,
      Job,
      Location,
      Salary,
    ]),
    HttpModule,
  ],
  controllers: [JobsController],
  providers: [JobsService, JobsMappingService, JobsSchedulerService],
})
export class JobsModule {}
