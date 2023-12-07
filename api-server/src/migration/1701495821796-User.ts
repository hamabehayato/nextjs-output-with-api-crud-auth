import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUserTable1701495821796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO \`user\` (\`name\`, \`email\`, \`password\`) VALUES
          ('Test', 'test@email.com', 'password'),
          ('Sample', 'sample@email.com', 'password')
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE \`user\`;
    `);
  }
}
