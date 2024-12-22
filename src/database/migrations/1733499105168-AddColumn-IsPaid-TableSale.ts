import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnIsPaidTableSale1733499105168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'isPaid',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'isPaid');
  }
}
