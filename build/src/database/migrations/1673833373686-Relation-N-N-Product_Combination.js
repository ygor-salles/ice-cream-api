"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationNNProductCombination1673833373686 = void 0;
const typeorm_1 = require("typeorm");
class RelationNNProductCombination1673833373686 {
    async up(queryRunner) {
        await queryRunner.dropForeignKey('combinations', 'FKProduct');
        await queryRunner.dropColumn('combinations', 'product_id');
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
    async down(queryRunner) {
        await queryRunner.dropTable('product_combination');
        await queryRunner.addColumn('combinations', new typeorm_1.TableColumn({
            name: 'product_id',
            type: 'int',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('combinations', new typeorm_1.TableForeignKey({
            name: 'FKProduct',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        }));
    }
}
exports.RelationNNProductCombination1673833373686 = RelationNNProductCombination1673833373686;
