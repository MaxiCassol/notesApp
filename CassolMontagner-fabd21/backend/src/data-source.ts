import { DataSource } from 'typeorm';
import { Note } from './note/entities/note.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Note],
  synchronize: true,
});
