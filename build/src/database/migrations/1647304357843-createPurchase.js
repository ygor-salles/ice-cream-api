"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchase1647304357843 = void 0;
const typeorm_1 = require("typeorm");
class createPurchase1647304357843 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'purchases',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'value_total',
                    type: 'real',
                },
                {
                    name: 'observation',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'its_ice_cream_shoop',
                    type: 'boolean',
                },
                {
                    name: 'nf_url',
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
                    name: 'provider_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    name: 'FKProvider',
                    referencedTableName: 'providers',
                    referencedColumnNames: ['id'],
                    columnNames: ['provider_id'],
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('purchases');
    }
}
exports.createPurchase1647304357843 = createPurchase1647304357843;
