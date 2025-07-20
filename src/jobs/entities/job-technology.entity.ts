import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity("job_technologies")
export class JobTechnology {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  technology: string;

  @ManyToOne(() => Job, (job) => job.technologies)
  job: Job;
}
