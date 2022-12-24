import {
  AfterInsert,
  AfterRemove,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HookPayment } from '../hooks/HookPayment';
import { Client } from './Client';

@Entity('payments')
class Payment {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  value: number;

  @Column()
  observation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  client_id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @AfterInsert()
  async afterInsert(): Promise<void> {
    await HookPayment.updateDebitClient(this.value, this.client_id);
  }

  @AfterRemove()
  async afterRemove(): Promise<void> {
    await HookPayment.afterRemovedPaymentUpdateDebitClient(this.value, this.client_id);
  }
}

export { Payment };
