import { EnumTypeSale } from '../entities/Sale';
import { IProduct } from './IProduct';

export interface ISale {
  id?: number;
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  amount: number;
  created_at?: Date;
  updated_at?: Date;
  client_id?: number;
  data_product?: IProduct;
}

export interface IReadSumSales {
  startDate: string;
  endDate: string;
  type_sale?: EnumTypeSale;
}

export interface IReadSumSalesToday {
  type_sale?: EnumTypeSale;
}
