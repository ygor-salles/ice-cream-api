/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HookUser } from '../hooks/HookUser';

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
  async beforeInsert(): Promise<void> {
    this.password = await HookUser.hashPassword(this.password);
  }
}

export { User };
