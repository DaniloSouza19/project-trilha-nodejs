import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFineAmountColumnOnCars1638565166180
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cars',
      new TableColumn({
        name: 'fine_amount',
        type: 'numeric',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cars', 'fine_amount');
  }
}
