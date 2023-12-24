// typeORM entitiy file
// learn more about it in the docs: https://typeorm.io/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entity/User';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  // ユーザーID
  @Column({ default: 1 })
  user_id: number;

  @Column({ type: 'varchar', length: 191, default: '' })
  title: string;

  @Column({ type: 'varchar', length: 191, default: '' })
  content: string;

  // TodoとUserのリレーションを定義
  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
