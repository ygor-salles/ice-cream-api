"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnTypeTableProduct1663522824896 = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("../../entities/Product");
class AddCollumnTypeTableProduct1663522824896 {
    async up(queryRunner) {
        await queryRunner.addColumn('products', new typeorm_1.TableColumn({
            name: 'type',
            type: 'enum',
            enum: [
                Product_1.EnumTypeProduct.ACAI,
                Product_1.EnumTypeProduct.GENERAL,
                Product_1.EnumTypeProduct.ICE_CREAM,
                Product_1.EnumTypeProduct.POPSICLE,
                Product_1.EnumTypeProduct.SALTY,
                Product_1.EnumTypeProduct.GELADINHO,
            ],
            isNullable: true,
            default: null,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('products', 'type');
    }
}
exports.AddCollumnTypeTableProduct1663522824896 = AddCollumnTypeTableProduct1663522824896;
