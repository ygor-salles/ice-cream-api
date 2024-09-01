"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePayment1646782250548 = void 0;
const typeorm_1 = require("typeorm");
class CreatePayment1646782250548 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'payments',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'value',
                    type: 'real',
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
                    name: 'client_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    name: 'FKClient',
                    referencedTableName: 'clients',
                    referencedColumnNames: ['id'],
                    columnNames: ['client_id'],
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('payments');
    }
}
exports.CreatePayment1646782250548 = CreatePayment1646782250548;
