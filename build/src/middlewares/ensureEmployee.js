"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureEmployee = void 0;
const User_1 = require("../entities/User");
const UserService_1 = require("../services/UserService");
async function ensureEmployee(request, response, next) {
    const { userId } = request;
    const userService = new UserService_1.UserService();
    const user = await userService.readById(+userId);
    if (user.role === User_1.EnumRoleUser.EMPLOYEE || user.role === User_1.EnumRoleUser.SUPER) {
        return next();
    }
    response.status(401).json({ message: 'Usuário não autorizado!' });
}
exports.ensureEmployee = ensureEmployee;