import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddConstraintUniqueNameTableCombination1671630402875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'combinations',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'combinations',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
      }),
    );
  }
}
