import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  CREATOR = "CREATOR",
  DONATOR = "DONATOR",
}

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
