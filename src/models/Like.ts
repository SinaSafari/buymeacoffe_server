import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Post, User } from "./index";

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  like_id!: number;

  @ManyToOne((type) => Post, (post) => post.likes)
  post_id!: Post;

  @ManyToOne((type) => User, (user) => user.likes)
  user_id!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
