import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DropTableProductCombination1679710436954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_combination');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
}
