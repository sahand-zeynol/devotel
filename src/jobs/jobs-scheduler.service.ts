import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { JobsMappingService } from "./jobs-mapping.service";
import { JobsService } from "./jobs.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class JobsSchedulerService {
  private readonly logger = new Logger(JobsSchedulerService.name);

  constructor(
    private readonly jobsService: JobsService,
    private readonly jobsMapper: JobsMappingService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  @Cron(process.env.JOB_FETCH_CRON || CronExpression.EVERY_6_HOURS)
  async handleCron() {
    const a = await this.fetchFromProviderA();
    const b = await this.fetchFromProviderB();
    this.logger.log(`CRON: Saved ${a + b} jobs`);
  }

  async fetchFromProviderA(): Promise<number> {
    try {
      const url = this.configService.get<string>("PROVIDER_A_URL");
      const response = await firstValueFrom(this.httpService.get(url));
      const jobs = this.jobsMapper.fromProviderA(response.data);

      for (const job of jobs) {
        await this.jobsService.createFromNormalized(job);
      }

      this.logger.log(`Provider A: Stored ${jobs.length} jobs`);
      return jobs.length;
    } catch (err) {
      this.logger.error("Provider A failed:", err.message);
      return 0;
    }
  }

  async fetchFromProviderB(): Promise<number> {
    try {
      const url = this.configService.get<string>("PROVIDER_B_URL");
      const response = await firstValueFrom(this.httpService.get(url));
      const jobs = this.jobsMapper.fromProviderB(response.data);

      for (const job of jobs) {
        await this.jobsService.createFromNormalized(job);
      }

      this.logger.log(`Provider B: Stored ${jobs.length} jobs`);
      return jobs.length;
    } catch (err) {
      this.logger.error("Provider B failed:", err.message);
      return 0;
    }
  }
}
