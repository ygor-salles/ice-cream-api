import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnDataProductTableSale1671629878332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'data_product',
        type: 'jsonb',
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'data_product');
  }
}
