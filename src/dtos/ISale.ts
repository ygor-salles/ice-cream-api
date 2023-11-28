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

export interface IReadSalesFilterPageQuery {
  limit?: string;
  page?: string;
  client_id?: number;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
export interface IReadSalesFilterPage {
  limit?: number;
  page?: number;
  client_id?: number;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
