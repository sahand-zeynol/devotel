import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity("locations")
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  remote?: boolean;

  @Column({ name: "full_address", nullable: true })
  fullAddress?: string;

  @OneToMany(() => Job, (job) => job.location)
  jobs: Job[];
}
