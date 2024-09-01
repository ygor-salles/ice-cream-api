"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSale1647022663577 = void 0;
const typeorm_1 = require("typeorm");
const Sale_1 = require("../../entities/Sale");
class createSale1647022663577 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'sales',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'total',
                    type: 'real',
                },
                {
                    name: 'type_sale',
                    type: 'enum',
                    enum: [Sale_1.EnumTypeSale.PIX, Sale_1.EnumTypeSale.MONEY, Sale_1.EnumTypeSale.CARD, Sale_1.EnumTypeSale.DEBIT],
                },
                {
                    name: 'observation',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'product_id',
                    type: 'int',
                },
                {
                    name: 'client_id',
                    type: 'int',
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    name: 'FKProduct',
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    columnNames: ['product_id'],
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE',
                },
                {
                    name: 'FKClient',
                    referencedTableName: 'clients',
                    referencedColumnNames: ['id'],
                    columnNames: ['client_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('sales');
    }
}
exports.createSale1647022663577 = createSale1647022663577;
