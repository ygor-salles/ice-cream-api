import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('purchase')
class Purchase {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  value: number;

  @Column()
  its_ice_cream_shoop: boolean;

  @Column()
  nf_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Purchase };
