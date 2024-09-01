"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = exports.EnumTypeSale = void 0;
const typeorm_1 = require("typeorm");
const HookSale_1 = require("../hooks/HookSale");
const Client_1 = require("./Client");
var EnumTypeSale;
(function (EnumTypeSale) {
    EnumTypeSale["PIX"] = "PIX";
    EnumTypeSale["CARD"] = "CARTAO";
    EnumTypeSale["MONEY"] = "DINHEIRO";
    EnumTypeSale["DEBIT"] = "FIADO";
    EnumTypeSale["CASH_CLOSING"] = "FECHAMENTO DE CAIXA";
})(EnumTypeSale = exports.EnumTypeSale || (exports.EnumTypeSale = {}));
let Sale = class Sale {
    async afterInsert() {
        if (this.type_sale === EnumTypeSale.DEBIT) {
            await HookSale_1.HookSale.updateDebitClient(this.total, this.client_id);
        }
    }
    async afterRemove() {
        if (this.type_sale === EnumTypeSale.DEBIT) {
            await HookSale_1.HookSale.afterRemovedSaleUpdateDebitClient(this.total, this.client_id);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "type_sale", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "observation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sale.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Sale.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Array)
], Sale.prototype, "data_product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Sale.prototype, "in_progress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Client_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", Client_1.Client)
], Sale.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Sale.prototype, "afterInsert", null);
__decorate([
    (0, typeorm_1.AfterRemove)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Sale.prototype, "afterRemove", null);
Sale = __decorate([
    (0, typeorm_1.Entity)('sales')
], Sale);
exports.Sale = Sale;
