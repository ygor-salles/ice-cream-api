"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClients1646746277920 = void 0;
const typeorm_1 = require("typeorm");
class CreateClients1646746277920 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'clients',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'debit',
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
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('clients');
    }
}
exports.CreateClients1646746277920 = CreateClients1646746277920;
