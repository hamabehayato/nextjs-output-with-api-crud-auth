import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './todo/entity/Todo';
import { User } from './auth/entity/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'user',
  password: 'pass',
  database: 'NEXTJS_OUTPUT_WITH_CRUD_AUTH_DB', // Docker Composeで指定したMySQLのデータベース名
  synchronize: true,
  logging: true,
  entities: [Todo, User],
  migrations: ['dist/migration/*.js'],
  subscribers: [],
});
