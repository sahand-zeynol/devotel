import { Controller, Get, Query } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { FindJobsDto } from "./dto/find-jobs.dto";
import { PageOptionsDto } from "../common/dtos";
import { JobsSchedulerService } from "./jobs-scheduler.service";

@Controller("job-offers")
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly scheduler: JobsSchedulerService
  ) {}

  @Get("provider-a")
  async fetchA() {
    const count = await this.scheduler.fetchFromProviderA();
    return { provider: "A", message: `Fetched ${count} jobs.` };
  }

  @Get("provider-b")
  async fetchB() {
    const count = await this.scheduler.fetchFromProviderB();
    return { provider: "B", message: `Fetched ${count} jobs.` };
  }

  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filters: FindJobsDto
  ) {
    return this.jobsService.findAll(pageOptionsDto, filters);
  }
}
