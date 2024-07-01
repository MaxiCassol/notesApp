import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from './note.repository';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class NoteService {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find({
      where: { archived: false },
      relations: ['categories'],
    });
  }

  async findAllArchived(): Promise<Note[]> {
    return this.noteRepository.find({
      where: { archived: true },
      relations: ['categories'],
    });
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const existingNote = await this.findOne(id);
    const updatedNote = await this.noteRepository.save({
      ...existingNote,
      ...updateNoteDto,
    });
    return updatedNote;
  }

  async remove(id: string): Promise<void> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
  }

  async archive(id: string): Promise<Note> {
    console.log(`Archiving note with ID: ${id}`);
    return this.update(id, { archived: true } as UpdateNoteDto);
  }

  async unarchive(id: string): Promise<Note> {
    console.log(`Unarchiving note with ID: ${id}`);
    return this.update(id, { archived: false } as UpdateNoteDto);
  }

  async addCategoryToNote(noteId: string, categoryId: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['categories'],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID "${noteId}" not found`);
    }

    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID "${categoryId}" not found`);
    }

    if (!note.categories) {
      note.categories = [];
    }

    note.categories.push(category);
    return this.noteRepository.save(note);
  }

  async removeCategoryFromNote(
    noteId: string,
    categoryId: string,
  ): Promise<Note> {
    const note = await this.findOne(noteId);
    if (!note) {
      throw new NotFoundException(`Note with ID "${noteId}" not found`);
    }

    note.categories = note.categories.filter((cat) => cat.id !== categoryId);

    return this.noteRepository.save(note);
  }

  async filterByCategoryName(categoryName: string): Promise<Note[]> {
    const allNotes = await this.findAll();
    const filteredNotes = allNotes.filter((note) =>
      note.categories.some(
        (category) =>
          category.name.toLowerCase() === categoryName.toLowerCase(),
      ),
    );
    return filteredNotes;
  }
}
