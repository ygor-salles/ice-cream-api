import { EnumTypeSale } from '../entities/Sale';

export interface ISale {
  id?: number;
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  amount: number;
  created_at?: Date;
  updated_at?: Date;
  product_id: number;
  client_id?: number;
}
