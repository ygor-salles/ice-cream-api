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
exports.SaleController = void 0;
const SaleService_1 = require("../services/SaleService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const SaleValidator_1 = require("../validators/SaleValidator");
class SaleController {
    async create(request, response) {
        var _a;
        const data = __rest(request.body, []);
        const saleValidator = new SaleValidator_1.SaleValidator();
        try {
            await saleValidator.createValidaton().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        const saleService = new SaleService_1.SaleService();
        const sale = await saleService.create(data);
        response.status(201).json(sale);
    }
    async readById(request, response) {
        var _a;
        const { id } = request.params;
        const saleValidator = new SaleValidator_1.SaleValidator();
        try {
            await saleValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await saleValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Sale does not exist');
        const saleService = new SaleService_1.SaleService();
        const sale = await saleService.readById(+id);
        response.status(200).json(sale);
    }
    async deleteById(request, response) {
        var _a;
        const { id } = request.params;
        const saleValidator = new SaleValidator_1.SaleValidator();
        try {
            await saleValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await saleValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Sale does not exist');
        const saleService = new SaleService_1.SaleService();
        await saleService.deleteById(+id);
        response.status(200).json({ message: 'Sale deleted successfully' });
    }
    async updateById(request, response) {
        var _a;
        const { id } = request.params;
        const data = __rest(request.body, []);
        const saleValidator = new SaleValidator_1.SaleValidator();
        try {
            await saleValidator.updateValidation().validate(Object.assign({ id: +id }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await saleValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Sale does not exist');
        const saleService = new SaleService_1.SaleService();
        await saleService.updateById(+id, data);
        response.status(200).json({ message: 'Sale updated successfully' });
    }
    async readSumSalesByPeriod(request, response) {
        var _a;
        const data = request.body;
        const saleValidator = new SaleValidator_1.SaleValidator();
        try {
            await saleValidator.readSumSalesByPeriod().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        const saleService = new SaleService_1.SaleService();
        const sumSale = await saleService.readSumSalesByPeriod(data);
        response.status(200).json(Object.assign({}, sumSale));
    }
    async readSumOfTodaySales(request, response) {
        var _a;
        const data = request.body;
        const saleValidator = new SaleValidator_1.SaleValidator();
        try {
            await saleValidator.readSumOfTodaySales().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        const saleService = new SaleService_1.SaleService();
        const sumSales = await saleService.readSumOfTodaySales(data);
        response.status(200).json(Object.assign({}, sumSales));
    }
    async dailyCashClosing(request, response) {
        var _a;
        const data = request.body;
        const saleValidator = new SaleValidator_1.SaleValidator();
        try {
            await saleValidator.cashClosing().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        const saleService = new SaleService_1.SaleService();
        const sale = await saleService.dailyCashClosing(data);
        response.status(200).json(sale);
    }
    async readSalesActivatedAcai(request, response) {
        const saleService = new SaleService_1.SaleService();
        const allSales = await saleService.readSalesActivatedAcai();
        response.status(200).json(allSales);
    }
    async readFilterSalePage(request, response) {
        var _a;
        const { limit, page, client_id, end_date, observation, start_date } = request.query;
        const limitNum = parseInt(limit) || 1;
        const pageNum = parseInt(page) || 1;
        const dataFormmated = {
            client_id,
            end_date,
            observation,
            start_date,
            limit: limitNum,
            page: pageNum,
        };
        const saleValidator = new SaleValidator_1.SaleValidator();
        try {
            await saleValidator.readSalesFilterPage().validate(dataFormmated, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!saleValidator.isRangeDateValid(start_date, end_date)) {
            throw new ApiError_1.ApiError(400, 'Range date incorrect');
        }
        const saleService = new SaleService_1.SaleService();
        const salesFilterPage = await saleService.readSalesFilterPage(dataFormmated);
        response.status(200).json(salesFilterPage);
    }
}
exports.SaleController = SaleController;
