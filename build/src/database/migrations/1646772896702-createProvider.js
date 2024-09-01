"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProvider1646772896702 = void 0;
const typeorm_1 = require("typeorm");
class createProvider1646772896702 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'providers',
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
                    name: 'its_ice_cream_shoop',
                    type: 'boolean',
                    default: true,
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
        await queryRunner.dropTable('providers');
    }
}
exports.createProvider1646772896702 = createProvider1646772896702;
