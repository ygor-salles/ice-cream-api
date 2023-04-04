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

export interface IDataProduct {
  amount: number;
  name: string;
  price: number;
  type: EnumTypeProduct;
  combinations?: Array<{ name: string; price: number }>;
  total: number;
}
