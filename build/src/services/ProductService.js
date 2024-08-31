"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const typeorm_1 = require("typeorm");
const ProductRepository_1 = require("../repositories/ProductRepository");
class ProductService {
    constructor() {
        this.repositoryProduct = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
    }
    async create(data) {
        const product = this.repositoryProduct.create(data);
        await this.repositoryProduct.save(product);
        return product;
    }
    async read() {
        const allProducts = await this.repositoryProduct.find({
            order: { updated_at: 'DESC' },
        });
        return allProducts;
    }
    async readById(id) {
        const product = await this.repositoryProduct.findOne(id);
        return product;
    }
    async deleteById(id) {
        await this.repositoryProduct.delete(id);
    }
    async updateById(id, data) {
        await this.repositoryProduct.update(id, data);
    }
}
exports.ProductService = ProductService;
