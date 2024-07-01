import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get('archived')
  findAllArchived() {
    return this.noteService.findAllArchived();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @Get('category/:categoryName')
  filterByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<Note[]> {
    return this.noteService.filterByCategoryName(categoryName);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }

  @Delete(':noteId/categories/:categoryId')
  removeCategoryFromNote(
    @Param('noteId') noteId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.noteService.removeCategoryFromNote(noteId, categoryId);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.noteService.archive(id);
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.noteService.unarchive(id);
  }
}
