import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NoteService } from './note/note.service';
import { CreateNoteDto } from './note/dto/create-note.dto';
import { UpdateNoteDto } from './note/dto/update-note.dto';

@Controller('notes')
export class AppController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get('archived')
  findAllArchived() {
    return this.noteService.findAllArchived();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.noteService.findOne(id);
  }

  @Get('category/:categoryName')
  filterByCategory(@Param('categoryName') categoryName: string) {
    return this.noteService.filterByCategoryName(categoryName);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.noteService.remove(id);
  }

  @Patch(':id/archive')
  archive(@Param('id', ParseUUIDPipe) id: string) {
    return this.noteService.archive(id);
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id', ParseUUIDPipe) id: string) {
    return this.noteService.unarchive(id);
  }
}
