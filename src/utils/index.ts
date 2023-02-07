import { IPurchase, IPurchaseMultipart } from '../dtos/IPurchase';

export const formaterDataPurchase = (dataMultipart: IPurchaseMultipart): IPurchase => {
  const data: IPurchase = {
    ...dataMultipart,
    value_total: Number(dataMultipart.value_total),
    its_ice_cream_shoop: dataMultipart.its_ice_cream_shoop === 'true',
    provider_id: Number(dataMultipart.provider_id),
  };
  return data;
};
