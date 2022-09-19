import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnAmountTableSale1663527042069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({ name: 'amount', type: 'smallint', isNullable: true, default: null }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'amount');
  }
}
