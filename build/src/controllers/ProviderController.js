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
exports.ProviderController = void 0;
const ProviderService_1 = require("../services/ProviderService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const ProviderValidator_1 = require("../validators/ProviderValidator");
class ProviderController {
    async create(request, response) {
        var _a;
        const data = __rest(request.body, []);
        const providerValidator = new ProviderValidator_1.ProviderValidator();
        try {
            await providerValidator.createValidaton().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (await providerValidator.nameExist(data.name))
            throw new ApiError_1.ApiError(400, 'Provider already exists');
        const providerService = new ProviderService_1.ProviderService();
        const provider = await providerService.create(data);
        response.status(201).json(provider);
    }
    async read(request, response) {
        const providerService = new ProviderService_1.ProviderService();
        const provider = await providerService.read();
        response.status(200).json(provider);
    }
    async readById(request, response) {
        var _a;
        const { id } = request.params;
        const providerValidator = new ProviderValidator_1.ProviderValidator();
        try {
            await providerValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await providerValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Provider does not exist');
        const providerService = new ProviderService_1.ProviderService();
        const provider = await providerService.readById(+id);
        response.status(200).json(provider);
    }
    async updateById(request, response) {
        var _a;
        const { id } = request.params;
        const data = __rest(request.body, []);
        const providerValidator = new ProviderValidator_1.ProviderValidator();
        try {
            await providerValidator
                .updateValidation()
                .validate(Object.assign({ id: +id }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await providerValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Provider does not exist');
        const providerService = new ProviderService_1.ProviderService();
        await providerService.updateById(+id, data);
        response.status(200).json({ message: 'Provider updated successfully' });
    }
    async deleteById(request, response) {
        var _a;
        const { id } = request.params;
        const providerValidator = new ProviderValidator_1.ProviderValidator();
        try {
            await providerValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await providerValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Provider does not exist');
        const providerService = new ProviderService_1.ProviderService();
        await providerService.deleteById(+id);
        response.status(200).json({ message: 'Provider deleted successfully' });
    }
}
exports.ProviderController = ProviderController;
