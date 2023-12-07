// ファイル生成コマンド npx typeorm migration:create src/migration/User
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodoTable1700394238770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* todoテーブルがない場合は todo テーブル作成 */
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`todo\` (
          \`id\` INT NOT NULL AUTO_INCREMENT,
          \`user_id\` INT NOT NULL,
          \`title\` VARCHAR(191) NOT NULL,
          \`content\` VARCHAR(1500) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS \`todo\`;
    `);
  }
}
