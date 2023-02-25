import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInProgressTableSale1677115382215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'in_progress',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'in_progress');
  }
}
