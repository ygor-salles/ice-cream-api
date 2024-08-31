"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleService = void 0;
const typeorm_1 = require("typeorm");
const Sale_1 = require("../entities/Sale");
const SaleRepository_1 = require("../repositories/SaleRepository");
const utils_1 = require("../utils");
const ClientRepository_1 = require("../repositories/ClientRepository");
class SaleService {
    constructor() {
        this.repositorySale = (0, typeorm_1.getCustomRepository)(SaleRepository_1.SaleRepository);
        this.repositoryClient = (0, typeorm_1.getCustomRepository)(ClientRepository_1.ClientRepository);
    }
    async create(data) {
        const sale = this.repositorySale.create(data);
        await this.repositorySale.save(sale);
        return sale;
    }
    async readById(id) {
        const sale = await this.repositorySale.findOne(id, {
            relations: ['client'],
        });
        return sale;
    }
    async deleteById(id) {
        const sale = await this.repositorySale.findOne(id);
        await this.repositorySale.remove(sale);
    }
    async updateById(id, data) {
        if (data.client_id) {
            const oldSale = await this.repositorySale.findOne(id);
            const client = await this.repositoryClient.findOne(data.client_id);
            if (oldSale.type_sale !== Sale_1.EnumTypeSale.DEBIT && data.type_sale === Sale_1.EnumTypeSale.DEBIT) {
                await this.repositoryClient.update(client.id, Object.assign(Object.assign({}, client), { debit: client.debit + data.total }));
            }
            else if (oldSale.type_sale === Sale_1.EnumTypeSale.DEBIT &&
                data.type_sale !== Sale_1.EnumTypeSale.DEBIT &&
                data.total <= client.debit) {
                await this.repositoryClient.update(client.id, Object.assign(Object.assign({}, client), { debit: client.debit - data.total }));
            }
            else if (oldSale.type_sale === Sale_1.EnumTypeSale.DEBIT &&
                data.type_sale === Sale_1.EnumTypeSale.DEBIT) {
                if (oldSale.total <= data.total) {
                    const difference = data.total - oldSale.total;
                    await this.repositoryClient.update(client.id, Object.assign(Object.assign({}, client), { debit: client.debit + difference }));
                }
                else {
                    const difference = oldSale.total - data.total;
                    if (difference <= client.debit) {
                        await this.repositoryClient.update(client.id, Object.assign(Object.assign({}, client), { debit: client.debit - difference }));
                    }
                }
            }
        }
        await this.repositorySale.update(id, data);
    }
    async readSumSalesByPeriod({ startDate, endDate, type_sale }) {
        let sumSales;
        if (startDate === endDate) {
            sumSales = await this.readSumOneDaySales(startDate, type_sale);
        }
        else {
            sumSales = type_sale
                ? await this.repositorySale
                    .createQueryBuilder('sales')
                    .select('SUM(total)', 'total_sales')
                    .where('created_at BETWEEN :startDate AND :endDate', {
                    startDate,
                    endDate: `${endDate} 23:59:59`,
                })
                    .andWhere('type_sale = :type_sale', { type_sale })
                    .getRawOne()
                : await this.repositorySale
                    .createQueryBuilder('sales')
                    .select('SUM(total)', 'total_sales')
                    .where('created_at BETWEEN :startDate AND :endDate', {
                    startDate,
                    endDate: `${endDate} 23:59:59`,
                })
                    .getRawOne();
        }
        return sumSales;
    }
    async readSumOfTodaySales({ type_sale }) {
        const today = (0, utils_1.getLocalTodayDate)();
        const sumSales = type_sale
            ? await this.repositorySale
                .createQueryBuilder('sales')
                .select('SUM(total)', 'total_sales')
                .where("date_trunc('day', created_at) = :today", { today })
                .andWhere('type_sale = :type_sale', { type_sale })
                .getRawOne()
            : await this.repositorySale
                .createQueryBuilder('sales')
                .select('SUM(total)', 'total_sales')
                .where("date_trunc('day', created_at) = :today", { today })
                .getRawOne();
        return sumSales;
    }
    async readSumOneDaySales(singleDate, type_sale) {
        const sumSales = type_sale
            ? await this.repositorySale
                .createQueryBuilder('sales')
                .select('SUM(total)', 'total_sales')
                .where("date_trunc('day', created_at) = :singleDate", { singleDate })
                .andWhere('type_sale = :type_sale', { type_sale })
                .getRawOne()
            : await this.repositorySale
                .createQueryBuilder('sales')
                .select('SUM(total)', 'total_sales')
                .where("date_trunc('day', created_at) = :singleDate", { singleDate })
                .getRawOne();
        return sumSales;
    }
    async dailyCashClosing(data) {
        const object = (data === null || data === void 0 ? void 0 : data.created_at)
            ? Object.assign(Object.assign({}, data), { updated_at: data.created_at, type_sale: Sale_1.EnumTypeSale.CASH_CLOSING }) : Object.assign(Object.assign({}, data), { type_sale: Sale_1.EnumTypeSale.CASH_CLOSING });
        const sale = this.repositorySale.create(object);
        await this.repositorySale.save(sale);
        return sale;
    }
    async readSalesActivatedAcai() {
        const allSales = await this.repositorySale.find({
            relations: ['client'],
            where: { in_progress: true },
            order: { created_at: 'ASC' },
        });
        return allSales;
    }
    mountedWhere({ client_id, end_date, observation, start_date }) {
        const where = {};
        if (client_id) {
            where.client_id = client_id;
        }
        if (observation) {
            where.observation = (0, typeorm_1.ILike)(`%${observation}%`);
        }
        if (start_date && end_date) {
            where.created_at = (0, typeorm_1.Between)(`${start_date} 00:00:00`, `${end_date} 23:59:59`);
        }
        return where;
    }
    async readSalesFilterPage({ start_date, end_date, limit, page, client_id, observation, }) {
        const offset = page * limit - limit;
        const [salePaged, total] = await this.repositorySale.findAndCount({
            order: { created_at: 'DESC' },
            skip: offset,
            take: limit,
            relations: ['client'],
            where: this.mountedWhere({ client_id, end_date, observation, start_date }),
        });
        const totalPages = total > limit ? Math.ceil(total / limit) : 1;
        return {
            total,
            page,
            totalPages,
            limit,
            offset: offset + limit,
            instances: salePaged,
        };
    }
}
exports.SaleService = SaleService;
