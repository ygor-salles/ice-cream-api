import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Combination } from './Combination';

export enum EnumTypeProduct {
  ICE_CREAM = 'SORVETE',
  ACAI = 'ACAI',
  POPSICLE = 'PICOLE',
  GELADINHO = 'GELADINHO',
  SALTY = 'SALGADO',
  GENERAL = 'GERAL',
}

@Entity('products')
class Product {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  type: EnumTypeProduct;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Combination, combination => combination.products)
  @JoinTable({
    name: 'product_combination',
    joinColumns: [{ name: 'product_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'combination_id', referencedColumnName: 'id' }],
  })
  combinations: Combination[];
}

export { Product };
