"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookSale = void 0;
const typeorm_1 = require("typeorm");
const ClientRepository_1 = require("../repositories/ClientRepository");
const ApiError_1 = require("../validators/Exceptions/ApiError");
class HookSale {
    static async updateDebitClient(value, client_id) {
        const repositoryClient = (0, typeorm_1.getCustomRepository)(ClientRepository_1.ClientRepository);
        const client = await repositoryClient.findOne({ id: client_id });
        client.debit += value;
        client.updated_at = new Date();
        await repositoryClient.update({ id: client_id }, client);
    }
    static async afterRemovedSaleUpdateDebitClient(value, client_id) {
        const repositoryClient = (0, typeorm_1.getCustomRepository)(ClientRepository_1.ClientRepository);
        const client = await repositoryClient.findOne({ id: client_id });
        client.debit -= value;
        client.updated_at = new Date();
        if (client.debit < 0) {
            throw new ApiError_1.ApiError(400, 'Attention! Payment value greater than debit. Operation not completed!');
        }
        await repositoryClient.update({ id: client_id }, client);
    }
}
exports.HookSale = HookSale;
