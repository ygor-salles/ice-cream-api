"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnStatusTableProduct1663526002273 = void 0;
const typeorm_1 = require("typeorm");
class AddCollumnStatusTableProduct1663526002273 {
    async up(queryRunner) {
        await queryRunner.addColumn('products', new typeorm_1.TableColumn({
            name: 'status',
            type: 'boolean',
            default: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('products', 'status');
    }
}
exports.AddCollumnStatusTableProduct1663526002273 = AddCollumnStatusTableProduct1663526002273;
