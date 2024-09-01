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
exports.PurchaseController = void 0;
const PurchaseService_1 = require("../services/PurchaseService");
const PurchaseValidator_1 = require("../validators/PurchaseValidator");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const UploadController_1 = require("./UploadController");
const utils_1 = require("../utils");
class PurchaseController {
    async create(request, response) {
        var _a;
        const dataMultipart = request.body;
        const data = (0, utils_1.formaterDataPurchase)(dataMultipart);
        const purchaseValidator = new PurchaseValidator_1.PurchaseValidator();
        try {
            await purchaseValidator.createValidation().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (request.file) {
            data.nf_url = (await (0, UploadController_1.uploadImage)(data, 'nf_url', request)) || '';
        }
        const purchaseService = new PurchaseService_1.PurchaseService();
        const purchase = await purchaseService.create(data);
        response.status(201).json(purchase);
    }
    async read(request, response) {
        const purchaseService = new PurchaseService_1.PurchaseService();
        const purchase = await purchaseService.read();
        response.status(200).json(purchase);
    }
    async readById(request, response) {
        var _a;
        const { id } = request.params;
        const purchaseValidator = new PurchaseValidator_1.PurchaseValidator();
        try {
            await purchaseValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await purchaseValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Purchase does not exist');
        const purchaseService = new PurchaseService_1.PurchaseService();
        const purchase = await purchaseService.readById(+id);
        response.status(200).json(purchase);
    }
    async deleteById(request, response) {
        var _a;
        const { id } = request.params;
        const purchaseValidator = new PurchaseValidator_1.PurchaseValidator();
        try {
            await purchaseValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        const purchaseFound = await purchaseValidator.idExist(+id);
        if (!purchaseFound) {
            throw new ApiError_1.ApiError(400, 'Purchase does not exist');
        }
        const purchaseService = new PurchaseService_1.PurchaseService();
        if (purchaseFound === null || purchaseFound === void 0 ? void 0 : purchaseFound.nf_url) {
            await (0, UploadController_1.removeImage)(Number(id), purchaseFound, 'nf_url');
        }
        await purchaseService.deleteById(+id);
        response.status(200).json({ message: 'Purchase deleted successfully' });
    }
    async updateById(request, response) {
        var _a;
        const { id } = request.params;
        const dataMultipart = request.body;
        const data = (0, utils_1.formaterDataPurchase)(dataMultipart);
        const purchaseValidator = new PurchaseValidator_1.PurchaseValidator();
        try {
            await purchaseValidator
                .updateValidation()
                .validate(Object.assign({ id: +id }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        const purchaseFound = await purchaseValidator.idExist(+id);
        if (!purchaseFound) {
            throw new ApiError_1.ApiError(400, 'Purchase does not exist');
        }
        const purchaseService = new PurchaseService_1.PurchaseService();
        if (request.file) {
            data.nf_url = (await (0, UploadController_1.uploadImage)(data, 'nf_url', request)) || '';
            await (0, UploadController_1.removeImage)(Number(id), purchaseFound, 'nf_url');
        }
        await purchaseService.updateById(+id, data);
        response.status(200).json({ message: 'Purchase updated successfully' });
    }
    async readSumPurchasesByPeriod(request, response) {
        var _a;
        const data = request.body;
        const purchaseValidator = new PurchaseValidator_1.PurchaseValidator();
        try {
            await purchaseValidator.readSumPurchasesByPeriod().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        const purchaseService = new PurchaseService_1.PurchaseService();
        const sumPurchases = await purchaseService.readSumPurchasesByPeriod(data);
        response.status(200).json(Object.assign({}, sumPurchases));
    }
    async readSumPurchasesToday(request, response) {
        const purchaseService = new PurchaseService_1.PurchaseService();
        const sumPurchases = await purchaseService.readSumPurchasesToday();
        response.status(200).json(Object.assign({}, sumPurchases));
    }
    async readPurchasesPaged(request, response) {
        var _a;
        const _b = request.query, { limit, page } = _b, rest = __rest(_b, ["limit", "page"]);
        const limitNum = parseInt(limit) || 1;
        const pageNum = parseInt(page) || 1;
        const dataFormmated = Object.assign(Object.assign({}, rest), { limit: limitNum, page: pageNum });
        const validator = new PurchaseValidator_1.PurchaseValidator();
        try {
            await validator.readPagedValidation().validate(dataFormmated, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!validator.isRangeDateValid(rest.start_date, rest.end_date)) {
            throw new ApiError_1.ApiError(400, 'Range date incorrect');
        }
        const purchaseService = new PurchaseService_1.PurchaseService();
        const allPurchasesPaged = await purchaseService.readPurchasesPaged(dataFormmated);
        response.json(allPurchasesPaged);
    }
}
exports.PurchaseController = PurchaseController;
