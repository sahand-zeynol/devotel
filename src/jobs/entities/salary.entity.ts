import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity("salaries")
export class Salary {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  min?: number;

  @Column({ nullable: true })
  max?: number;

  @Column({ nullable: true })
  currency?: string;

  @Column({ name: "raw_text", nullable: true })
  rawText?: string;

  @OneToMany(() => Job, (job) => job.salary)
  jobs: Job[];
}
