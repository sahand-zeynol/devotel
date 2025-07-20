import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity("job_sources")
export class JobSource {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "jsonb", nullable: true })
  metadata?: Record<string, any>;

  @OneToMany(() => Job, (job) => job.source)
  jobs: Job[];
}
