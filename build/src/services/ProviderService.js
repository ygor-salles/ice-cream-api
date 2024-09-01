"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const typeorm_1 = require("typeorm");
const ProviderRepository_1 = require("../repositories/ProviderRepository");
class ProviderService {
    constructor() {
        this.repositoryProvider = (0, typeorm_1.getCustomRepository)(ProviderRepository_1.ProviderRepository);
    }
    async create(data) {
        const provider = this.repositoryProvider.create(data);
        await this.repositoryProvider.save(provider);
        return provider;
    }
    async read() {
        const allProviders = await this.repositoryProvider.find({ order: { updated_at: 'DESC' } });
        return allProviders;
    }
    async readById(id) {
        const provider = await this.repositoryProvider.findOne(id);
        return provider;
    }
    async deleteById(id) {
        await this.repositoryProvider.delete(id);
    }
    async updateById(id, data) {
        await this.repositoryProvider.update(id, data);
    }
}
exports.ProviderService = ProviderService;
