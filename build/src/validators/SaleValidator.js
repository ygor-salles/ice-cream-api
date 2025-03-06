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
exports.SaleValidator = void 0;
const typeorm_1 = require("typeorm");
const yup = __importStar(require("yup"));
const Product_1 = require("../entities/Product");
const Sale_1 = require("../entities/Sale");
const SaleRepository_1 = require("../repositories/SaleRepository");
class SaleValidator {
    async idExist(id) {
        const repository = (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
        const sale = await repository.findOne(id);
        return !!sale;
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
    createValidaton() {
        return yup.object().shape({
            total: yup.number().required('Total is required'),
            type_sale: yup
                .mixed()
                .oneOf(Object.values(Sale_1.EnumTypeSale))
                .required('Type_sale is required'),
            observation: yup.string().optional(),
            client_id: yup.number().optional(),
            in_progress: yup.bool().optional(),
            data_product: yup
                .array()
                .of(yup.object().shape({
                amount: yup.number().required('Amount data_product is required'),
                name: yup.string().required('Name data_product is required'),
                price: yup.number().required('Price data_product is required'),
                combinations: yup
                    .array()
                    .of(yup.object().shape({
                    name: yup.string(),
                    price: yup.number(),
                }))
                    .optional(),
                type: yup
                    .mixed()
                    .oneOf(Object.values(Product_1.EnumTypeProduct))
                    .required('Type data_product is required'),
                total: yup.number().required('Total is required'),
            }))
                .required('Data_product is required'),
            isPaid: yup.bool(),
        });
    }
    updateValidation() {
        return yup.object().shape({
            id: yup.number().optional(),
            total: yup.number().optional(),
            type_sale: yup.mixed().oneOf(Object.values(Sale_1.EnumTypeSale)).optional(),
            observation: yup.string().nullable().optional(),
            client_id: yup.number().optional(),
            in_progress: yup.bool().optional(),
            data_product: yup
                .array()
                .of(yup.object().shape({
                amount: yup.number().optional(),
                name: yup.string().optional(),
                price: yup.number().optional(),
                combinations: yup
                    .array()
                    .of(yup.object().shape({
                    name: yup.string(),
                    price: yup.number(),
                }))
                    .optional(),
                type: yup.mixed().oneOf(Object.values(Product_1.EnumTypeProduct)).optional(),
                total: yup.number().optional(),
            }))
                .optional(),
            isPaid: yup.bool().optional(),
        });
    }
    deleteByIdValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
        });
    }
    readByIdValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
        });
    }
    readSumSalesByPeriod() {
        return yup.object().shape({
            startDate: yup.string().required('StartDate is required'),
            endDate: yup.string().required('EndDate is required'),
            type_sale: yup.mixed().oneOf(Object.values(Sale_1.EnumTypeSale)).optional(),
        });
    }
    readSumOfTodaySales() {
        return yup.object().shape({
            type_sale: yup.mixed().oneOf(Object.values(Sale_1.EnumTypeSale)).optional(),
        });
    }
    cashClosing() {
        return yup.object().shape({
            total: yup.number().required('Total is required'),
            created_at: yup.date().optional(),
        });
    }
    readSalesFilterPage() {
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
            client_id: yup.string().optional(),
            observation: yup.string().optional(),
            start_date: yup.string().optional(),
            end_date: yup.string().optional(),
        });
    }
}
exports.SaleValidator = SaleValidator;
