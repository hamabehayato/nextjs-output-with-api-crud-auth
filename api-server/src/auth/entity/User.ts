// typeORM entitiy file
// learn more about it in the docs: https://typeorm.io/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { Todo } from '../../todo/entity/Todo';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  // UserとTodoのリレーションを定義
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
