import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Like, User } from "./index";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  post_id!: number;

  @Column()
  text!: string;

  @Column()
  link!: string;

  @ManyToOne((type) => User, (user) => user.posts)
  owner!: number;

  @OneToMany((type) => Like, (like) => like.post_id)
  likes!: Like[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
