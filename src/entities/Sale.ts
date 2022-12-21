/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IProduct } from '../dtos/IProduct';
import { Client } from './Client';
import { Product } from './Product';

export enum EnumTypeSale {
  PIX = 'PIX',
  CARD = 'CARTAO',
  MONEY = 'DINHEIRO',
  DEBIT = 'FIADO',
}

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  total: number;

  @Column()
  type_sale: EnumTypeSale;

  @Column()
  observation: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'simple-json' })
  data_product: IProduct;

  @Column()
  client_id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}

export { Sale };
