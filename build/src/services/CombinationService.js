"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinationService = void 0;
const typeorm_1 = require("typeorm");
const CombinationRepository_1 = require("../repositories/CombinationRepository");
class CombinationService {
    constructor() {
        this.repositoryCombination = (0, typeorm_1.getCustomRepository)(CombinationRepository_1.CombinationRepository);
    }
    async create(data) {
        const combination = this.repositoryCombination.create(data);
        await this.repositoryCombination.save(combination);
        return combination;
    }
    async read() {
        const allCombinations = await this.repositoryCombination.find({
            order: { updated_at: 'DESC' },
        });
        return allCombinations;
    }
    async readById(id) {
        const combination = await this.repositoryCombination.findOne(id);
        return combination;
    }
    async deleteById(id) {
        await this.repositoryCombination.delete(id);
    }
    async updateById(id, data) {
        await this.repositoryCombination.update(id, data);
    }
}
exports.CombinationService = CombinationService;
