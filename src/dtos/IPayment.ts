export interface IPayment {
  id?: number;
  value: number;
  observation: string;
  client_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
