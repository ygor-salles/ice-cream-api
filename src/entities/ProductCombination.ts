import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('product_combination')
class ProductCombination {
  @PrimaryColumn()
  readonly product_id: string;

  @PrimaryColumn()
  readonly combination_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { ProductCombination };
