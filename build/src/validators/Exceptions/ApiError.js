"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    constructor(code, message) {
        this.message = message;
        this.code = code;
    }
}
exports.ApiError = ApiError;
