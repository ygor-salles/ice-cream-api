import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { EnumTypeProduct } from '../../entities/Product';

export class AddCollumnTypeTableProduct1663522824896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: [
          EnumTypeProduct.ACAI,
          EnumTypeProduct.GENERAL,
          EnumTypeProduct.ICE_CREAM,
          EnumTypeProduct.POPSICLE,
          EnumTypeProduct.SALTY,
          EnumTypeProduct.GELADINHO,
        ],
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'type');
  }
}
