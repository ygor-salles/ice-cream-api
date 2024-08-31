"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalTodayDate = exports.formaterDataPurchase = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const formaterDataPurchase = (dataMultipart) => {
    const data = {
        observation: dataMultipart.observation === 'undefined' ? undefined : dataMultipart.observation,
        value_total: Number(dataMultipart.value_total),
        its_ice_cream_shoop: dataMultipart.its_ice_cream_shoop === 'true',
        provider_id: Number(dataMultipart.provider_id),
        created_at: (dataMultipart === null || dataMultipart === void 0 ? void 0 : dataMultipart.created_at) === 'undefined' ? undefined : new Date(dataMultipart.created_at),
    };
    return data;
};
exports.formaterDataPurchase = formaterDataPurchase;
const getLocalTodayDate = () => {
    const today = (0, moment_timezone_1.default)(new Date());
    const todayLocal = today.tz('America/Sao_Paulo');
    return todayLocal.format('YYYY-MM-DD');
};
exports.getLocalTodayDate = getLocalTodayDate;
