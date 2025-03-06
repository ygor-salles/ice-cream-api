"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookUser = void 0;
const bcryptjs_1 = require("bcryptjs");
class HookUser {
    static async hashPassword(password) {
        password = (0, bcryptjs_1.hashSync)(password, 8);
        return password;
    }
}
exports.HookUser = HookUser;
