import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePayment1646782250548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'value',
            type: 'real',
          },
          {
            name: 'observation',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'client_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'FKClient',
            referencedTableName: 'clients',
            referencedColumnNames: ['id'],
            columnNames: ['client_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payments');
  }
}
