import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Note } from '../../note/entities/note.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Note, (note) => note.categories)
  notes: Note[];
}
