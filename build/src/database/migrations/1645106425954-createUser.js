"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1639344969624 = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../entities/User");
class CreateUsers1639344969624 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
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
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: [User_1.EnumRoleUser.NORMAL, User_1.EnumRoleUser.EMPLOYEE, User_1.EnumRoleUser.SUPER],
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
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsers1639344969624 = CreateUsers1639344969624;
