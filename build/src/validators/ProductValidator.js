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
exports.ProductValidator = void 0;
const typeorm_1 = require("typeorm");
const yup = __importStar(require("yup"));
const Product_1 = require("../entities/Product");
const ProductRepository_1 = require("../repositories/ProductRepository");
class ProductValidator {
    async idExist(id) {
        const repository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const product = await repository.findOne(id);
        return !!product;
    }
    async nameExist(name) {
        const repository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const product = await repository.findOne({ name });
        return !!product;
    }
    createValidaton() {
        return yup.object().shape({
            name: yup.string().required('Name is required'),
            price: yup.number().optional(),
            description: yup.string().optional(),
            type: yup
                .mixed()
                .oneOf(Object.values(Product_1.EnumTypeProduct))
                .required('Type_product is required'),
            status: yup.boolean().optional(),
        });
    }
    updateValidation() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
            name: yup.string().optional(),
            price: yup.number().optional(),
            description: yup.string().optional(),
            type: yup.mixed().oneOf(Object.values(Product_1.EnumTypeProduct)).optional(),
            status: yup.boolean().optional(),
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
}
exports.ProductValidator = ProductValidator;
