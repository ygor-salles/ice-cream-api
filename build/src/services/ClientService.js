"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const typeorm_1 = require("typeorm");
const ClientRepository_1 = require("../repositories/ClientRepository");
class ClientService {
    constructor() {
        this.repositoryClient = (0, typeorm_1.getCustomRepository)(ClientRepository_1.ClientRepository);
    }
    async create(data) {
        const client = this.repositoryClient.create(data);
        await this.repositoryClient.save(client);
        return client;
    }
    async read() {
        const allClients = await this.repositoryClient.find({ order: { updated_at: 'DESC' } });
        return allClients;
    }
    async readById(id) {
        const client = await this.repositoryClient.findOne(id);
        return client;
    }
    async deleteById(id) {
        await this.repositoryClient.delete(id);
    }
    async updateById(id, data) {
        await this.repositoryClient.update(id, data);
    }
    async readSumDebitClient() {
        const sumDebits = await this.repositoryClient
            .createQueryBuilder('clients')
            .select('SUM(debit)', 'total_debits')
            .getRawOne();
        return sumDebits;
    }
}
exports.ClientService = ClientService;
