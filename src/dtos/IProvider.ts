export interface IProvider {
  id?: number;
  name: string;
  phone?: string;
  its_ice_cream_shoop: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface IReadSumPurchases {
  startDate: string;
  endDate: string;
  its_ice_cream_shoop?: boolean;
  provider_id?: number;
}
