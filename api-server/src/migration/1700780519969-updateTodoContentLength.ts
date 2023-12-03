import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTodoContentLength1700780519969
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `todo` MODIFY COLUMN `content` VARCHAR(1500)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `todo` MODIFY COLUMN `content` varchar(191)',
    );
  }
}
