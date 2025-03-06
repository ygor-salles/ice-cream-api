"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const ApiError_1 = require("../validators/Exceptions/ApiError");
require("dotenv/config");
function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        throw new ApiError_1.ApiError(401);
    }
    const [, token] = authToken.split(' ');
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        request.userId = sub;
        return next();
    }
    catch (error) {
        throw new ApiError_1.ApiError(401);
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
