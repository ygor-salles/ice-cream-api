export interface IPayment {
  id?: number;
  value: number;
  observation?: string;
  client_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IReadPaymentsFilterPageQuery {
  limit?: string;
  page?: string;
  client_id?: number;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
export interface IReadPaymentsFilterPage {
  limit?: number;
  page?: number;
  client_id?: number;
  observation?: string;
  start_date?: string;
  end_date?: string;
}

export interface IMountedWherePayment {
  client_id?: number;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
