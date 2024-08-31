"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const UserRepository_1 = require("../repositories/UserRepository");
class AuthService {
    async execute({ email, password }) {
        const connectUser = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        // Verificar se email existe
        const user = await connectUser.findOne({ email });
        if (!user) {
            return { status: 400, message: 'Credenciais incorretas!' };
        }
        // Verificar se a senha está correta
        const isMatchPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isMatchPassword) {
            return { status: 400, message: 'Credenciais incorretas!' };
        }
        const token = (0, jsonwebtoken_1.sign)({
            email: user.email,
            name: user.name,
            role: user.role,
        }, process.env.JWT_SECRET, {
            subject: user.id.toString(),
            expiresIn: process.env.TOKEN_EXPIRE || '1d',
        });
        return { token };
    }
}
exports.AuthService = AuthService;
