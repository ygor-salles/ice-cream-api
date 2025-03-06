"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnIsPaidTableSale1733499105168 = void 0;
const typeorm_1 = require("typeorm");
class AddColumnIsPaidTableSale1733499105168 {
    async up(queryRunner) {
        await queryRunner.addColumn('sales', new typeorm_1.TableColumn({
            name: 'isPaid',
            type: 'boolean',
            default: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('sales', 'isPaid');
    }
}
exports.AddColumnIsPaidTableSale1733499105168 = AddColumnIsPaidTableSale1733499105168;
