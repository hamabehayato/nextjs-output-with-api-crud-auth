// typeORM entitiy file
// learn more about it in the docs: https://typeorm.io/
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191, default: '' })
  title: string;

  @Column({ type: 'varchar', length: 191, default: '' })
  content: string;
}
