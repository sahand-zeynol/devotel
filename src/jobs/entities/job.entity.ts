import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobSource } from "./job-source.entity";
import { Company } from "./company.entity";
import { Salary } from "./salary.entity";
import { JobRequirement } from "./job-requirements.entity";
import { JobTechnology } from "./job-technology.entity";
import { Location } from "./location.entity";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "external_job_id" })
  externalJobId: string;

  @Column()
  title: string;

  @Column({ name: "employment_type", nullable: true })
  employmentType?: string;

  @Column({ name: "posted_date", type: "timestamptz", nullable: true })
  postedDate?: Date;

  @ManyToOne(() => JobSource, (source) => source.jobs)
  source: JobSource;

  @ManyToOne(() => Company, (company) => company.jobs, { cascade: true })
  company: Company;

  @ManyToOne(() => Location, (location) => location.jobs, { cascade: true })
  location: Location;

  @ManyToOne(() => Salary, (salary) => salary.jobs, { cascade: true })
  salary: Salary;

  @OneToOne(() => JobRequirement, (req) => req.job, {
    cascade: true,
    eager: true,
  })
  requirement: JobRequirement;

  @OneToMany(() => JobTechnology, (jt) => jt.job, {
    cascade: true,
    eager: true,
  })
  technologies: JobTechnology[];
}
