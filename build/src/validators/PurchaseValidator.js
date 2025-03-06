"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseValidator = void 0;
const yup = __importStar(require("yup"));
const typeorm_1 = require("typeorm");
const PurchaseRepository_1 = require("../repositories/PurchaseRepository");
class PurchaseValidator {
    async idExist(id) {
        const repository = (0, typeorm_1.getCustomRepository)(PurchaseRepository_1.PurchaseRepository);
        const purchase = await repository.findOne(id);
        return purchase;
    }
    isRangeDateValid(start_date, end_date) {
        if (start_date && !end_date)
            return false;
        if (!start_date && end_date)
            return false;
        if (new Date(start_date) > new Date(end_date))
            return false;
        return true;
    }
    deleteByIdValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
        });
    }
    updateValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
            value_total: yup.number().optional(),
            observation: yup.string().optional(),
            its_ice_cream_shoop: yup.boolean().optional(),
            provider_id: yup.number().optional(),
        });
    }
    createValidation() {
        return yup.object().shape({
            value_total: yup.number().required('Value total is required'),
            observation: yup.string().optional(),
            its_ice_cream_shoop: yup.boolean().required('Its_ice_cream_shoop is required'),
            provider_id: yup.number().required('Provider_id is required'),
            created_at: yup.date().optional(),
        });
    }
    readByIdValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
        });
    }
    readSumPurchasesByPeriod() {
        return yup.object().shape({
            startDate: yup.string().required('StartDate is required'),
            endDate: yup.string().required('EndDate is required'),
            its_ice_cream_shoop: yup.bool().optional(),
            provider_id: yup.number().optional(),
        });
    }
    readPagedValidation() {
        return yup.object().shape({
            limit: yup
                .number()
                .min(1, 'Minimum limit per page is 1')
                .max(100, 'Maximum limit per page is 100')
                .required('Limit is required in query params'),
            page: yup
                .number()
                .min(1, 'Minimum limit per page is 1')
                .required('Limit is required in query params'),
            provider_id: yup.string().optional(),
            observation: yup.string().optional(),
            start_date: yup.string().optional(),
            end_date: yup.string().optional(),
        });
    }
}
exports.PurchaseValidator = PurchaseValidator;
