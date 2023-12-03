import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1701495821795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* m_userテーブルがない場合は m_user テーブル作成 */
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS \`user\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(255) NOT NULL,
      \`email\` VARCHAR(255) NOT NULL,
      \`password\` VARCHAR(255) NOT NULL,
      \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE IF EXISTS \`user\`;
  `);
  }
}
