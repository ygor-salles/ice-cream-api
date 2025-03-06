"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const utils_1 = require("./utils");
exports.default = async () => (0, typeorm_1.createConnection)((0, utils_1.connectionConfig)());
