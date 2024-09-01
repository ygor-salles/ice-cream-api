"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.default = async () => (0, typeorm_1.createConnection)();
