import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPurchase1647304357843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchases',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'value_total',
            type: 'real',
          },
          {
            name: 'observation',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'its_ice_cream_shoop',
            type: 'boolean',
          },
          {
            name: 'nf_url',
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
            name: 'provider_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'FKProvider',
            referencedTableName: 'providers',
            referencedColumnNames: ['id'],
            columnNames: ['provider_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases');
  }
}
