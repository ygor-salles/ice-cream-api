import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Provider } from './Provider';

@Entity('purchases')
class Purchase {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  value_total: number;

  @Column()
  its_ice_cream_shoop: boolean;

  @Column()
  observation: string;

  @Column()
  nf_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  provider_id?: number;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;
}

export { Purchase };
