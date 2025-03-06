"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeColumnTypeSaleTableSale1677101444260 = void 0;
const typeorm_1 = require("typeorm");
const Sale_1 = require("../../entities/Sale");
class ChangeColumnTypeSaleTableSale1677101444260 {
    async up(queryRunner) {
        await queryRunner.changeColumn('sales', 'type_sale', new typeorm_1.TableColumn({
            name: 'type_sale',
            type: 'enum',
            enum: [
                Sale_1.EnumTypeSale.PIX,
                Sale_1.EnumTypeSale.MONEY,
                Sale_1.EnumTypeSale.CARD,
                Sale_1.EnumTypeSale.DEBIT,
                Sale_1.EnumTypeSale.CASH_CLOSING,
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.changeColumn('sales', 'type_sale', new typeorm_1.TableColumn({
            name: 'type_sale',
            type: 'enum',
            enum: [Sale_1.EnumTypeSale.PIX, Sale_1.EnumTypeSale.MONEY, Sale_1.EnumTypeSale.CARD, Sale_1.EnumTypeSale.DEBIT],
        }));
    }
}
exports.ChangeColumnTypeSaleTableSale1677101444260 = ChangeColumnTypeSaleTableSale1677101444260;
