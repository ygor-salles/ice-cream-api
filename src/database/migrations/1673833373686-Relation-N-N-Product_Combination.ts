import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class RelationNNProductCombination1673833373686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('combinations', 'FKProduct');
    await queryRunner.dropColumn('combinations', 'product_id');

    await queryRunner.createTable(
      new Table({
        name: 'product_combination',
        columns: [
          {
            name: 'product_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'combination_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKProduct',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKCombination',
            referencedTableName: 'combinations',
            referencedColumnNames: ['id'],
            columnNames: ['combination_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_combination');

    await queryRunner.addColumn(
      'combinations',
      new TableColumn({
        name: 'product_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'combinations',
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
