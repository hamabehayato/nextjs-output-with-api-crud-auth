import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './todo/entity/Todo';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'user',
  password: 'pass',
  database: 'nextjs_output_with_crud_auth_DB', // Docker Composeで指定したMySQLのデータベース名
  synchronize: true,
  logging: true,
  entities: [Todo],
  migrations: ['dist/migration/*.js'],
  subscribers: [],
});
