"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProgressTableSale1677115382215 = void 0;
const typeorm_1 = require("typeorm");
class AddColumnInProgressTableSale1677115382215 {
    async up(queryRunner) {
        await queryRunner.addColumn('sales', new typeorm_1.TableColumn({
            name: 'in_progress',
            type: 'boolean',
            default: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('sales', 'in_progress');
    }
}
exports.AddColumnInProgressTableSale1677115382215 = AddColumnInProgressTableSale1677115382215;
