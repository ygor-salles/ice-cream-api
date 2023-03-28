import { EnumTypeSale } from '../entities/Sale';
import { IDataProduct } from './IProduct';

export interface ISale {
  id?: number;
  total: number;
  type_sale: EnumTypeSale;
  observation?: string;
  in_progress: boolean;
  created_at?: Date;
  updated_at?: Date;
  client_id?: number;
  data_product?: IDataProduct[];
}

export interface IReadSumSales {
  startDate: string;
  endDate: string;
  type_sale?: EnumTypeSale;
}

export interface IReadSumSalesToday {
  type_sale?: EnumTypeSale;
}

export interface IPostCashClosing {
  total: number;
  created_at?: Date;
}
