/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { hashSync } from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EnumRoleUser {
  SUPER = 'SUPER',
  NORMAL = 'NORMAL',
  EMPLOYEE = 'EMPLOYEE',
}

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: EnumRoleUser;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 8);
  }
}

export { User };
