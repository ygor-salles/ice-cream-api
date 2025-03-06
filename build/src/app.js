"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("./database");
const routes_1 = require("./routes");
const ApiError_1 = require("./validators/Exceptions/ApiError");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('src'));
app.use(routes_1.router);
// eslint-disable-next-line no-unused-vars
app.use((err, request, response, next) => {
    if (err instanceof ApiError_1.ApiError) {
        if (err.message) {
            return response.status(err.code).json({
                message: err.message,
            });
        }
        return response.status(err.code).end();
    }
    return response.status(500).json({
        message: err.message || 'Internal Server Error',
    });
});
