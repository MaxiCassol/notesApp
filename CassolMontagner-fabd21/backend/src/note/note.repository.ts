import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NoteRepository extends Repository<Note> {
  constructor(@InjectRepository(Note) repository: Repository<Note>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
