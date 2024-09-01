"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropTableProductCombination1679710436954 = void 0;
const typeorm_1 = require("typeorm");
class DropTableProductCombination1679710436954 {
    async up(queryRunner) {
        await queryRunner.dropTable('product_combination');
    }
    async down(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'product_combination',
            columns: [
                {
                    name: 'product_id',
                    type: 'int',
                    isPrimary: true,
                },
                {
                    name: 'combination_id',
                    type: 'int',
                    isPrimary: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
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
                    name: 'FKCombination',
                    referencedTableName: 'combinations',
                    referencedColumnNames: ['id'],
                    columnNames: ['combination_id'],
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE',
                },
            ],
        }));
    }
}
exports.DropTableProductCombination1679710436954 = DropTableProductCombination1679710436954;
