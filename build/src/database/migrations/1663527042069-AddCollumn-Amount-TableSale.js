"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnAmountTableSale1663527042069 = void 0;
const typeorm_1 = require("typeorm");
class AddCollumnAmountTableSale1663527042069 {
    async up(queryRunner) {
        await queryRunner.addColumn('sales', new typeorm_1.TableColumn({ name: 'amount', type: 'smallint', isNullable: true, default: null }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('sales', 'amount');
    }
}
exports.AddCollumnAmountTableSale1663527042069 = AddCollumnAmountTableSale1663527042069;
