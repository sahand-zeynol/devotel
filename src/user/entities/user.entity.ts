import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Entity,
} from "typeorm";
import { hash } from "bcryptjs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, default: "", nullable: true })
  firstName: string;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
    nullable: true,
  })
  lastName: string;

  @Column({ type: "varchar", length: 12, nullable: false })
  username: string;

  @Column({ type: "varchar", length: 128, nullable: false, select: false })
  password: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
