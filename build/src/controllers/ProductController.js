"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const ProductValidator_1 = require("../validators/ProductValidator");
class ProductController {
    async create(request, response) {
        var _a;
        const data = __rest(request.body, []);
        const productValidator = new ProductValidator_1.ProductValidator();
        try {
            await productValidator.createValidaton().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (await productValidator.nameExist(data.name))
            throw new ApiError_1.ApiError(400, 'Product already exists');
        const productService = new ProductService_1.ProductService();
        const product = await productService.create(data);
        response.status(201).json(product);
    }
    async read(request, response) {
        const productService = new ProductService_1.ProductService();
        const product = await productService.read();
        response.status(200).json(product);
    }
    async readById(request, response) {
        var _a;
        const { id } = request.params;
        const productValidator = new ProductValidator_1.ProductValidator();
        try {
            await productValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await productValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Product does not exist');
        const productService = new ProductService_1.ProductService();
        const product = await productService.readById(+id);
        response.status(200).json(product);
    }
    async deleteById(request, response) {
        var _a;
        const { id } = request.params;
        const productValidator = new ProductValidator_1.ProductValidator();
        try {
            await productValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await productValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Product does not exist');
        const productService = new ProductService_1.ProductService();
        await productService.deleteById(+id);
        response.status(200).json({ message: 'Product deleted successfully' });
    }
    async updateById(request, response) {
        var _a;
        const { id } = request.params;
        const data = __rest(request.body, []);
        const productValidator = new ProductValidator_1.ProductValidator();
        try {
            await productValidator
                .updateValidation()
                .validate(Object.assign({ id: +id }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await productValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Product does not exist');
        const productService = new ProductService_1.ProductService();
        await productService.updateById(+id, data);
        response.status(200).json({ message: 'Product updated successfully' });
    }
}
exports.ProductController = ProductController;
