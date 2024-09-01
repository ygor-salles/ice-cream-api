"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const AuthValidator_1 = require("../validators/AuthValidator");
class AuthController {
    async handle(request, response) {
        const { email, password } = request.body;
        const authValidator = new AuthValidator_1.AuthValidator();
        try {
            await authValidator.authValidation().validate(request.body, { abortEarly: false });
        }
        catch (error) {
            response.status(400).json({ message: error.message });
        }
        const authenticateUserService = new AuthService_1.AuthService();
        const token = await authenticateUserService.execute({
            email,
            password,
        });
        if (token.status === 400) {
            response.status(400).json({ message: token.message });
        }
        response.json(token);
    }
}
exports.AuthController = AuthController;
