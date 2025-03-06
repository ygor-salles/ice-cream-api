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
exports.PaymentValidator = void 0;
const typeorm_1 = require("typeorm");
const yup = __importStar(require("yup"));
const PaymentRepository_1 = require("../repositories/PaymentRepository");
class PaymentValidator {
    async idExist(id) {
        const repository = (0, typeorm_1.getCustomRepository)(PaymentRepository_1.PaymentRepository);
        const payment = await repository.findOne(id);
        return !!payment;
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
            value: yup.number().required('Value is required'),
            observation: yup.string().optional(),
            client_id: yup.number().required('Client_id is required'),
        });
    }
    updateValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
            value: yup.string().optional(),
            observation: yup.string().optional(),
            client_id: yup.number().optional(),
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
            client_id: yup.string().optional(),
            observation: yup.string().optional(),
            start_date: yup.string().optional(),
            end_date: yup.string().optional(),
        });
    }
}
exports.PaymentValidator = PaymentValidator;
