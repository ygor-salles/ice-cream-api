"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const index_1 = __importDefault(require("./database/index"));
// DEPLOY 08/06/2023
(0, index_1.default)()
    .then(async () => {
    console.log('Database connection successfully initialized 👍');
    app_1.app.listen(process.env.PORT || 4000, () => console.log(`Server is running ${process.env.PORT || 4000} 🚀`));
})
    .catch(error => {
    console.log(`TypeORM connection error: ${error.message} ❌`);
    app_1.app.listen(process.env.PORT || 4000, () => console.log(`Server is running ${process.env.PORT || 4000} 🚀`));
});
