"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnDataProductTableSale1671629878332 = void 0;
const typeorm_1 = require("typeorm");
class AddColumnDataProductTableSale1671629878332 {
    async up(queryRunner) {
        await queryRunner.addColumn('sales', new typeorm_1.TableColumn({
            name: 'data_product',
            type: 'jsonb',
            isNullable: true,
            default: null,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('sales', 'data_product');
    }
}
exports.AddColumnDataProductTableSale1671629878332 = AddColumnDataProductTableSale1671629878332;
