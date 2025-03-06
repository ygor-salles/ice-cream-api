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
exports.CombinationController = void 0;
const CombinationService_1 = require("../services/CombinationService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const CombinationValidator_1 = require("../validators/CombinationValidator");
class CombinationController {
    async create(request, response) {
        var _a;
        const data = __rest(request.body, []);
        const combinationValidator = new CombinationValidator_1.CombinationValidator();
        try {
            await combinationValidator.createValidaton().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (await combinationValidator.nameExist(data.name))
            throw new ApiError_1.ApiError(400, 'Combination already exists');
        const combinationService = new CombinationService_1.CombinationService();
        const combination = await combinationService.create(data);
        response.status(201).json(combination);
    }
    async read(request, response) {
        const combinationService = new CombinationService_1.CombinationService();
        const combination = await combinationService.read();
        response.status(200).json(combination);
    }
    async readById(request, response) {
        var _a;
        const { id } = request.params;
        const combinationValidator = new CombinationValidator_1.CombinationValidator();
        try {
            await combinationValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await combinationValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Combination does not exist');
        const combinationService = new CombinationService_1.CombinationService();
        const combination = await combinationService.readById(+id);
        response.status(200).json(combination);
    }
    async deleteById(request, response) {
        var _a;
        const { id } = request.params;
        const combinationValidator = new CombinationValidator_1.CombinationValidator();
        try {
            await combinationValidator
                .deleteByIdValidation()
                .validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await combinationValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Combination does not exist');
        const combinationService = new CombinationService_1.CombinationService();
        await combinationService.deleteById(+id);
        response.status(200).json({ message: 'Combination deleted successfully' });
    }
    async updateById(request, response) {
        var _a;
        const { id } = request.params;
        const data = __rest(request.body, []);
        const combinationValidator = new CombinationValidator_1.CombinationValidator();
        try {
            await combinationValidator
                .updateValidation()
                .validate(Object.assign({ id: +id }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await combinationValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Combination does not exist');
        const combinationService = new CombinationService_1.CombinationService();
        await combinationService.updateById(+id, data);
        response.status(200).json({ message: 'Combination updated successfully' });
    }
}
exports.CombinationController = CombinationController;
