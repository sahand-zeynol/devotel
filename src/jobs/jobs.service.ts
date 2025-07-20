import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./entities/job.entity";
import { Company } from "./entities/company.entity";
import { Location } from "./entities/location.entity";
import { Salary } from "./entities/salary.entity";
import { JobSource } from "./entities/job-source.entity";
import { JobRequirement } from "./entities/job-requirements.entity";
import { Repository } from "typeorm";
import { JobTechnology } from "./entities/job-technology.entity";
import { NormalizedJobDto } from "./dto/normalized-job.dto";
import { findOrCreate } from "../common/utils/typeorm-utils";
import { FindJobsDto } from "./dto/find-jobs.dto";
import { PageDto, PageMetaDto, PageOptionsDto } from "../common/dtos";

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(Location) private locationRepo: Repository<Location>,
    @InjectRepository(Salary) private salaryRepo: Repository<Salary>,
    @InjectRepository(JobSource) private sourceRepo: Repository<JobSource>,
    @InjectRepository(JobRequirement)
    private reqRepo: Repository<JobRequirement>,
    @InjectRepository(JobTechnology) private techRepo: Repository<JobTechnology>
  ) {}

  async createFromNormalized(normalized: NormalizedJobDto): Promise<Job> {
    const [company] = await findOrCreate(
      this.companyRepo,
      { name: normalized.company.name },
      normalized.company
    );

    const [source] = await findOrCreate(this.sourceRepo, {
      name: normalized.sourceName,
    });

    const location = await this.locationRepo.save(normalized.location);
    const salary = await this.salaryRepo.save(normalized.salary);

    const job = this.jobRepo.create({
      externalJobId: normalized.externalJobId,
      title: normalized.title,
      employmentType: normalized.employmentType,
      postedDate: normalized.postedDate,
      company,
      location,
      salary,
      source,
    });

    if (normalized.requirement) {
      const requirement = this.reqRepo.create({ ...normalized.requirement });
      await this.reqRepo.save(requirement);
      job.requirement = requirement;
    }

    if (normalized.technologies?.length) {
      job.technologies = await Promise.all(
        normalized.technologies.map((tech) =>
          this.techRepo.save(this.techRepo.create({ technology: tech }))
        )
      );
    }

    return this.jobRepo.save(job);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    filter: FindJobsDto
  ): Promise<PageDto<Job>> {
    const { skip, take } = pageOptionsDto;

    const query = this.jobRepo
      .createQueryBuilder("job")
      .leftJoinAndSelect("job.company", "company")
      .leftJoinAndSelect("job.location", "location")
      .leftJoinAndSelect("job.salary", "salary")
      .leftJoinAndSelect("job.source", "source")
      .leftJoinAndSelect("job.requirement", "requirement")
      .leftJoinAndSelect("job.technologies", "technologies")
      .skip(skip)
      .take(take);

    if (filter.title) {
      query.andWhere("job.title ILIKE :title", { title: `%${filter.title}%` });
    }

    if (filter.city) {
      query.andWhere("location.city ILIKE :city", { city: `%${filter.city}%` });
    }

    if (filter.state) {
      query.andWhere("location.state ILIKE :state", {
        state: `%${filter.state}%`,
      });
    }

    if (filter.companyName) {
      query.andWhere("company.name ILIKE :companyName", {
        companyName: `%${filter.companyName}%`,
      });
    }

    if (filter.sourceName) {
      query.andWhere("source.name = :sourceName", {
        sourceName: filter.sourceName,
      });
    }

    if (filter.technologies?.length) {
      query.andWhere("technologies.technology IN (:...techs)", {
        techs: filter.technologies,
      });
    }

    if (filter.salaryMin !== undefined) {
      query.andWhere("salary.max >= :salaryMin", {
        salaryMin: filter.salaryMin,
      });
    }

    if (filter.salaryMax !== undefined) {
      query.andWhere("salary.min <= :salaryMax", {
        salaryMax: filter.salaryMax,
      });
    }

    const [entities, itemCount] = await query.getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
