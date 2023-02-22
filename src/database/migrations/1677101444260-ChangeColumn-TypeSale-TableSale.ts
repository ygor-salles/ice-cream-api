import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { EnumTypeSale } from '../../entities/Sale';

export class ChangeColumnTypeSaleTableSale1677101444260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'sales',
      'type_sale',
      new TableColumn({
        name: 'type_sale',
        type: 'enum',
        enum: [
          EnumTypeSale.PIX,
          EnumTypeSale.MONEY,
          EnumTypeSale.CARD,
          EnumTypeSale.DEBIT,
          EnumTypeSale.CASH_CLOSING,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'sales',
      'type_sale',
      new TableColumn({
        name: 'type_sale',
        type: 'enum',
        enum: [EnumTypeSale.PIX, EnumTypeSale.MONEY, EnumTypeSale.CARD, EnumTypeSale.DEBIT],
      }),
    );
  }
}
