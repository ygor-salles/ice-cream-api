import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class DropFKProductTableUser1671588761022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sales', 'FKProduct');

    await queryRunner.dropColumn('sales', 'product_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'product_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        name: 'FKProduct',
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        columnNames: ['product_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
