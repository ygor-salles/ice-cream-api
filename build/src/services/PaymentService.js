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
exports.PaymentService = void 0;
const typeorm_1 = require("typeorm");
const PaymentRepository_1 = require("../repositories/PaymentRepository");
class PaymentService {
    constructor() {
        this.repositoryPayment = (0, typeorm_1.getCustomRepository)(PaymentRepository_1.PaymentRepository);
    }
    async create(data) {
        const payment = this.repositoryPayment.create(data);
        await this.repositoryPayment.save(payment);
        return payment;
    }
    async read() {
        const allPayments = await this.repositoryPayment.find({
            relations: ['client'],
            order: { updated_at: 'DESC' },
        });
        return allPayments;
    }
    async readById(id) {
        const payment = await this.repositoryPayment.findOne({ relations: ['client'], where: { id } });
        return payment;
    }
    async deleteById(id) {
        const payment = await this.repositoryPayment.findOne(id);
        await this.repositoryPayment.remove(payment);
    }
    async updateById(id, data) {
        await this.repositoryPayment.update(id, data);
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
    async readPaymentsPaged(_a) {
        var { limit, page } = _a, rest = __rest(_a, ["limit", "page"]);
        const offset = page * limit - limit;
        const [paymentPaged, total] = await this.repositoryPayment.findAndCount({
            order: { created_at: 'DESC' },
            skip: offset,
            take: limit,
            relations: ['client'],
            where: this.mountedWhere(rest),
        });
        const totalPages = total > limit ? Math.ceil(total / limit) : 1;
        return {
            total,
            page,
            totalPages,
            limit,
            offset: offset + limit,
            instances: paymentPaged,
        };
    }
}
exports.PaymentService = PaymentService;
