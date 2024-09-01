"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCombinations1647116887564 = void 0;
const typeorm_1 = require("typeorm");
class CreateCombinations1647116887564 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'combinations',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'real',
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
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('combinations');
    }
}
exports.CreateCombinations1647116887564 = CreateCombinations1647116887564;
