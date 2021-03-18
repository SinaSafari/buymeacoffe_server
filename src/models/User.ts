import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  CREATOR = "CREATOR",
  DONATOR = "DONATOR",
}

import { Post, Like } from "./index";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  // @Column({ type: "enum", enum: UserRole, default: UserRole.DONATOR })
  // role!: UserRole;
  @Column({ default: "DONATOR" })
  role!: string;

  @OneToMany((type) => Post, (post) => post.owner)
  posts!: Post[];

  @OneToMany((type) => Like, (like) => like.user_id)
  likes!: Like[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
