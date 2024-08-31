"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSeed = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("../../entities/Product");
const Sale_1 = require("../../entities/Sale");
const User_1 = require("../../entities/User");
const ClientRepository_1 = require("../../repositories/ClientRepository");
const PaymentRepository_1 = require("../../repositories/PaymentRepository");
const ProductRepository_1 = require("../../repositories/ProductRepository");
const ProviderRepository_1 = require("../../repositories/ProviderRepository");
const SaleRepository_1 = require("../../repositories/SaleRepository");
const UserRepository_1 = require("../../repositories/UserRepository");
class DataSeed {
    static async verifyEntities() {
        const repositoryUser = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        try {
            const allUsers = await repositoryUser.find();
            return !!allUsers.length;
        }
        catch (error) {
            return false;
        }
    }
    static async createUsers() {
        const repository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const arrayUsers = [];
        arrayUsers.push(repository.create({
            name: 'User 1',
            email: 'user1@gmail.com',
            password: '123456',
            role: User_1.EnumRoleUser.SUPER,
        }));
        arrayUsers.push(repository.create({
            name: 'User 2',
            email: 'user2@gmail.com',
            password: '123456',
            role: User_1.EnumRoleUser.NORMAL,
        }));
        arrayUsers.push(repository.create({
            name: 'User 3',
            email: 'user3@gmail.com',
            password: '123456',
            role: User_1.EnumRoleUser.NORMAL,
        }));
        arrayUsers.push(repository.create({
            name: 'User 4',
            email: 'user4@gmail.com',
            password: '123456',
            role: User_1.EnumRoleUser.EMPLOYEE,
        }));
        await repository.save(arrayUsers);
    }
    static async createClients() {
        const repository = (0, typeorm_1.getCustomRepository)(ClientRepository_1.ClientRepository);
        const arrayClients = [];
        arrayClients.push(repository.create({
            name: 'Maria Aparecida Teste',
            phone: '35984987634',
            debit: 300,
        }), repository.create({
            name: 'Carlos Gomes Teste',
            debit: 300,
        }), repository.create({
            name: 'Pedro Alcantara Teste',
            phone: '35984987636',
            debit: 0,
        }));
        await repository.save(arrayClients);
    }
    static async createPayments() {
        const repository = (0, typeorm_1.getCustomRepository)(PaymentRepository_1.PaymentRepository);
        const arrayPayments = [];
        arrayPayments.push(repository.create({
            value: 100,
            observation: '80 reais pago no pix, 20 reais no casrtão de crédito',
            client_id: 1,
        }), repository.create({
            value: 80,
            observation: '80 reais pago no dinheiro',
            client_id: 1,
        }), repository.create({
            value: 50,
            client_id: 2,
        }));
        await repository.save(arrayPayments);
    }
    static async createProducts() {
        const repository = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
        const arrayProducts = [];
        arrayProducts.push(repository.create({
            name: 'Chocolate Trento',
            price: 3.5,
            type: Product_1.EnumTypeProduct.GENERAL,
        }), repository.create({
            name: 'Sorvete de chocolate',
            description: 'Sorvete de chocolate samatina',
            type: Product_1.EnumTypeProduct.ICE_CREAM,
            status: true,
        }), repository.create({
            name: 'Pirulito',
            price: 0.5,
            description: 'Pirulito lolipop',
            type: Product_1.EnumTypeProduct.GENERAL,
            status: false,
        }));
        await repository.save(arrayProducts);
    }
    static async createProviders() {
        const repository = (0, typeorm_1.getCustomRepository)(ProviderRepository_1.ProviderRepository);
        const arrayProviders = [];
        arrayProviders.push(repository.create({
            name: 'José Francisco',
            phone: '35987650934',
            its_ice_cream_shoop: true,
        }), repository.create({
            name: 'Rosilene Mercado',
            its_ice_cream_shoop: false,
        }), repository.create({
            name: 'Amarildo',
            phone: '35987650932',
            its_ice_cream_shoop: true,
        }));
        await repository.save(arrayProviders);
    }
    static async createSales() {
        const repository = (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
        const arraySales = [];
        const dataProduct = [
            {
                id: 1,
                name: 'Salgadinho Cheetos',
                type: Product_1.EnumTypeProduct.GENERAL,
                price: 3.5,
                status: true,
                created_at: '2022-12-21T17:54:28.122Z',
                updated_at: '2022-12-21T17:54:28.122Z',
                description: 'Salgadinho Cheetos Descrição',
            },
        ];
        arraySales.push(repository.create({
            total: 6,
            type_sale: Sale_1.EnumTypeSale.MONEY,
            observation: 'Pago 3 reais no pix e 3 reais no dinheiro',
            client_id: 2,
            data_product: dataProduct,
        }), repository.create({
            total: 10,
            type_sale: Sale_1.EnumTypeSale.PIX,
            data_product: dataProduct,
        }), repository.create({
            total: 3.5,
            type_sale: Sale_1.EnumTypeSale.MONEY,
            client_id: 2,
            data_product: dataProduct,
        }));
        await repository.save(arraySales);
    }
}
exports.DataSeed = DataSeed;
