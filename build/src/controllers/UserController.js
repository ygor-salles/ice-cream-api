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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const UserValidator_1 = require("../validators/UserValidator");
class UserController {
    async create(request, response) {
        var _a;
        const data = __rest(request.body, []);
        const userValidator = new UserValidator_1.UserValidator();
        try {
            await userValidator.createValidaton().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (await userValidator.emailExist(data.email)) {
            throw new ApiError_1.ApiError(400, 'User already exists');
        }
        const userService = new UserService_1.UserService();
        const user = await userService.create(data);
        response.status(201).json(user);
    }
    async read(request, response) {
        const userService = new UserService_1.UserService();
        const user = await userService.read();
        response.status(200).json(user);
    }
    async readById(request, response) {
        var _a;
        const { id } = request.params;
        const userValidator = new UserValidator_1.UserValidator();
        try {
            await userValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await userValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'User does not exist');
        const userService = new UserService_1.UserService();
        const user = await userService.readById(+id);
        response.status(200).json(user);
    }
    async deleteById(request, response) {
        var _a;
        const { id } = request.params;
        const userValidator = new UserValidator_1.UserValidator();
        try {
            await userValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await userValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'User does not exist');
        const userService = new UserService_1.UserService();
        await userService.deleteById(+id);
        response.status(200).json({ message: 'User deleted successfully' });
    }
    async updateById(request, response) {
        var _a;
        const { id } = request.params;
        const data = __rest(request.body, []);
        const userValidator = new UserValidator_1.UserValidator();
        try {
            await userValidator.updateValidation().validate(Object.assign({ id: +id }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.join(', ')) || error);
        }
        if (!(await userValidator.idExist(+id)))
            throw new ApiError_1.ApiError(400, 'User does not exist');
        const userService = new UserService_1.UserService();
        await userService.updateById(+id, data);
        response.status(200).json({ message: 'User updated successfully' });
    }
}
exports.UserController = UserController;
