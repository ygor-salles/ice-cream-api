"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintUniqueNameTableCombination1671630402875 = void 0;
const typeorm_1 = require("typeorm");
class AddConstraintUniqueNameTableCombination1671630402875 {
    async up(queryRunner) {
        await queryRunner.changeColumn('combinations', 'name', new typeorm_1.TableColumn({
            name: 'name',
            type: 'varchar',
            isUnique: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.changeColumn('combinations', 'name', new typeorm_1.TableColumn({
            name: 'name',
            type: 'varchar',
        }));
    }
}
exports.AddConstraintUniqueNameTableCombination1671630402875 = AddConstraintUniqueNameTableCombination1671630402875;
