import moment from 'moment-timezone';
import { IPurchase, IPurchaseMultipart } from '../dtos/IPurchase';

export const formaterDataPurchase = (dataMultipart: IPurchaseMultipart): IPurchase => {
  const data: IPurchase = {
    observation: dataMultipart.observation === 'undefined' ? undefined : dataMultipart.observation,
    value_total: Number(dataMultipart.value_total),
    its_ice_cream_shoop: dataMultipart.its_ice_cream_shoop === 'true',
    provider_id: Number(dataMultipart.provider_id),
    created_at:
      dataMultipart?.created_at === 'undefined' ? undefined : new Date(dataMultipart.created_at),
  };
  return data;
};

export const getLocalTodayDate = () => {
  const today = moment(new Date());
  const todayLocal = today.tz('America/Sao_Paulo');
  return todayLocal.format('YYYY-MM-DD');
};
