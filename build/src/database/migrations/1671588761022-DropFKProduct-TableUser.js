"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropFKProductTableUser1671588761022 = void 0;
const typeorm_1 = require("typeorm");
class DropFKProductTableUser1671588761022 {
    async up(queryRunner) {
        await queryRunner.dropForeignKey('sales', 'FKProduct');
        await queryRunner.dropColumn('sales', 'product_id');
    }
    async down(queryRunner) {
        await queryRunner.addColumn('sales', new typeorm_1.TableColumn({
            name: 'product_id',
            type: 'int',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('sales', new typeorm_1.TableForeignKey({
            name: 'FKProduct',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        }));
    }
}
exports.DropFKProductTableUser1671588761022 = DropFKProductTableUser1671588761022;
