import { EnumTypeProduct } from '../entities/Product';

export interface IProduct {
  id?: number;
  name: string;
  price?: number;
  description?: string;
  type: EnumTypeProduct;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
