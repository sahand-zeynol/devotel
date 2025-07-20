import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Job } from "./job.entity";

@Entity("job_requirements")
export class JobRequirement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  experience?: number;

  @OneToOne(() => Job, (job) => job.requirement)
  @JoinColumn()
  job: Job;
}
