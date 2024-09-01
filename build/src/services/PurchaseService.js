"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const typeorm_1 = require("typeorm");
const PurchaseRepository_1 = require("../repositories/PurchaseRepository");
const utils_1 = require("../utils");
class PurchaseService {
    constructor() {
        this.repositoryPurchase = (0, typeorm_1.getCustomRepository)(PurchaseRepository_1.PurchaseRepository);
    }
    async create(data) {
        const purchase = this.repositoryPurchase.create(data);
        await this.repositoryPurchase.save(purchase);
        return purchase;
    }
    async read() {
        const allPurchases = await this.repositoryPurchase.find({
            order: { updated_at: 'DESC' },
            relations: ['provider'],
        });
        return allPurchases;
    }
    async readById(id) {
        const purchase = await this.repositoryPurchase.findOne(id, { relations: ['provider'] });
        return purchase;
    }
    async deleteById(id) {
        await this.repositoryPurchase.delete(id);
    }
    async updateById(id, data) {
        await this.repositoryPurchase.update(id, data);
    }
    async readSumPurchasesByPeriod({ startDate, endDate, its_ice_cream_shoop, provider_id, }) {
        let sumPurchases;
        if (startDate === endDate) {
            sumPurchases = this.readSumPurchasesOneDay(startDate, its_ice_cream_shoop, provider_id);
        }
        else if (its_ice_cream_shoop !== undefined && provider_id) {
            sumPurchases = this.repositoryPurchase
                .createQueryBuilder('purchases')
                .select('SUM(value_total)', 'total_purchases')
                .where('created_at BETWEEN :startDate AND :endDate', {
                startDate,
                endDate: `${endDate} 23:59:59`,
            })
                .andWhere('its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
                .andWhere('provider_id = :provider_id', { provider_id })
                .getRawOne();
        }
        else if (its_ice_cream_shoop !== undefined) {
            sumPurchases = this.repositoryPurchase
                .createQueryBuilder('purchases')
                .select('SUM(value_total)', 'total_purchases')
                .where('created_at BETWEEN :startDate AND :endDate', {
                startDate,
                endDate: `${endDate} 23:59:59`,
            })
                .andWhere('its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
                .getRawOne();
        }
        else if (provider_id) {
            sumPurchases = this.repositoryPurchase
                .createQueryBuilder('purchases')
                .select('SUM(value_total)', 'total_purchases')
                .where('created_at BETWEEN :startDate AND :endDate', {
                startDate,
                endDate: `${endDate} 23:59:59`,
            })
                .andWhere('provider_id = :provider_id', { provider_id })
                .getRawOne();
        }
        else {
            sumPurchases = this.repositoryPurchase
                .createQueryBuilder('purchases')
                .select('SUM(value_total)', 'total_purchases')
                .where('created_at BETWEEN :startDate AND :endDate', {
                startDate,
                endDate: `${endDate} 23:59:59`,
            })
                .getRawOne();
        }
        return sumPurchases;
    }
    async readSumPurchasesToday() {
        const today = (0, utils_1.getLocalTodayDate)();
        const sumPurchases = await this.repositoryPurchase
            .createQueryBuilder('purchases')
            .select('SUM(value_total)', 'total_purchases')
            .where("DATE_TRUNC('day', created_at) = :today", { today })
            .getRawOne();
        return sumPurchases;
    }
    async readSumPurchasesOneDay(singleDate, its_ice_cream_shoop, provider_id) {
        let sumPurchases;
        if (its_ice_cream_shoop !== undefined && provider_id) {
            sumPurchases = await this.repositoryPurchase
                .createQueryBuilder('purchases')
                .select('SUM(value_total)', 'total_purchases')
                .where("DATE_TRUNC('day', created_at) = :singleDate", { singleDate })
                .andWhere('its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
                .andWhere('provider_id = :provider_id', { provider_id })
                .getRawOne();
        }
        else if (its_ice_cream_shoop !== undefined) {
            sumPurchases = await this.repositoryPurchase
                .createQueryBuilder('purchases')
                .select('SUM(value_total)', 'total_purchases')
                .where("DATE_TRUNC('day', created_at) = :singleDate", { singleDate })
                .andWhere('its_ice_cream_shoop = :its_ice_cream_shoop', { its_ice_cream_shoop })
                .getRawOne();
        }
        else if (provider_id) {
            sumPurchases = await this.repositoryPurchase
                .createQueryBuilder('purchases')
                .select('SUM(value_total)', 'total_purchases')
                .where("DATE_TRUNC('day', created_at) = :singleDate", { singleDate })
                .andWhere('provider_id = :provider_id', { provider_id })
                .getRawOne();
        }
        else {
            sumPurchases = await this.repositoryPurchase
                .createQueryBuilder('purchases')
                .select('SUM(value_total)', 'total_purchases')
                .where("DATE_TRUNC('day', created_at) = :singleDate", { singleDate })
                .getRawOne();
        }
        return sumPurchases;
    }
    mountedWhere({ provider_id, end_date, observation, start_date }) {
        const where = {};
        if (provider_id) {
            where.provider_id = provider_id;
        }
        if (observation) {
            where.observation = (0, typeorm_1.ILike)(`%${observation}%`);
        }
        if (start_date && end_date) {
            where.created_at = (0, typeorm_1.Between)(`${start_date} 00:00:00`, `${end_date} 23:59:59`);
        }
        return where;
    }
    async readPurchasesPaged(_a) {
        var { limit, page } = _a, rest = __rest(_a, ["limit", "page"]);
        const offset = page * limit - limit;
        const [purchasePaged, total] = await this.repositoryPurchase.findAndCount({
            order: { created_at: 'DESC' },
            skip: offset,
            take: limit,
            relations: ['provider'],
            where: this.mountedWhere(rest),
        });
        const totalPages = total > limit ? Math.ceil(total / limit) : 1;
        return {
            total,
            page,
            totalPages,
            limit,
            offset: offset + limit,
            instances: purchasePaged,
        };
    }
}
exports.PurchaseService = PurchaseService;
