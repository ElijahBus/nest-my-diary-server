import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('bookmark-todo')
export class BookmarkTodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
