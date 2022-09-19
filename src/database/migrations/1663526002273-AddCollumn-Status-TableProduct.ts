import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnStatusTableProduct1663526002273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'status',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'status');
  }
}
