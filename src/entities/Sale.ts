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
import { IDataProduct } from '../dtos/IProduct';
import { HookSale } from '../hooks/HookSale';
import { Client } from './Client';

export enum EnumTypeSale {
  PIX = 'PIX',
  CARD = 'CARTAO',
  MONEY = 'DINHEIRO',
  DEBIT = 'FIADO',
  CASH_CLOSING = 'FECHAMENTO DE CAIXA',
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
  observation?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'simple-json' })
  data_product?: IDataProduct[];

  @Column()
  in_progress: boolean;

  @Column()
  client_id?: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @AfterInsert()
  async afterInsert(): Promise<void> {
    if (this.type_sale === EnumTypeSale.DEBIT) {
      await HookSale.updateDebitClient(this.total, this.client_id);
    }
  }

  @AfterRemove()
  async afterRemove(): Promise<void> {
    if (this.type_sale === EnumTypeSale.DEBIT) {
      await HookSale.afterRemovedSaleUpdateDebitClient(this.total, this.client_id);
    }
  }
}

export { Sale };
