export interface IPurchase {
  id?: number;
  value_total: number;
  observation?: string;
  its_ice_cream_shoop: boolean;
  nf_url?: string;
  created_at?: Date;
  updated_at?: Date;
  provider_id: number;
}

export interface IPurchaseMultipart {
  value_total: string;
  observation?: string;
  its_ice_cream_shoop: string;
  nf_url?: string;
  provider_id: string;
  created_at?: string;
}

export interface IReadPurchasesFilterPageQuery {
  limit?: string;
  page?: string;
  provider_id?: number;
  observation?: string;
  start_date?: string;
  end_date?: string;
}

export interface IReadPurchasesFilterPage {
  limit?: number;
  page?: number;
  provider_id?: number;
  observation?: string;
  start_date?: string;
  end_date?: string;
}

export interface IMountedWherePurchase {
  provider_id?: number;
  observation?: string;
  start_date?: string;
  end_date?: string;
}
