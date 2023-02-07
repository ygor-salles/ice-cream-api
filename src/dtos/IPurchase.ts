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
}
