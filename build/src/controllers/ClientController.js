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
exports.ClientController = void 0;
const ClientService_1 = require("../services/ClientService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const ClientValidator_1 = require("../validators/ClientValidator");
class ClientController {
    async create(request, response) {
        var _a;
        const data = __rest(request.body, []);
        const clientValidator = new ClientValidator_1.ClientValidator();
        try {
            await clientValidator.createValidaton().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (await clientValidator.nameExist(data.name))
            throw new ApiError_1.ApiError(400, 'Client already exists');
        const clientService = new ClientService_1.ClientService();
        const client = await clientService.create(data);
        response.status(201).json(client);
    }
    async read(request, response) {
        const clientService = new ClientService_1.ClientService();
        const client = await clientService.read();
        response.status(200).json(client);
    }
    async readById(request, response) {
        var _a;
        const { id } = request.params;
        const clientValidator = new ClientValidator_1.ClientValidator();
        try {
            await clientValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await clientValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Client does not exist');
        const clientService = new ClientService_1.ClientService();
        const client = await clientService.readById(+id);
        response.status(200).json(client);
    }
    async deleteById(request, response) {
        var _a;
        const { id } = request.params;
        const clientValidator = new ClientValidator_1.ClientValidator();
        try {
            await clientValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await clientValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Client does not exist');
        const clientService = new ClientService_1.ClientService();
        await clientService.deleteById(+id);
        response.status(200).json({ message: 'Client deleted successfully' });
    }
    async updateById(request, response) {
        var _a;
        const { id } = request.params;
        const data = __rest(request.body, []);
        const clientValidator = new ClientValidator_1.ClientValidator();
        try {
            await clientValidator
                .updateValidation()
                .validate(Object.assign({ id: +id }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await clientValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'Client does not exist');
        const clientService = new ClientService_1.ClientService();
        await clientService.updateById(+id, data);
        response.status(200).json({ message: 'Client updated successfully' });
    }
    async readSumDebitClient(request, response) {
        const clientService = new ClientService_1.ClientService();
        const sumDebits = await clientService.readSumDebitClient();
        response.status(200).json(sumDebits);
    }
}
exports.ClientController = ClientController;
