import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post("new")
  create(@Body() genre: Genre) {
    return this.genresService.create(genre);
  }

  @Get("all")
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.genresService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() genre: Genre): Promise<Genre> {
    return this.genresService.update(+id, genre);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.genresService.remove(+id);
  }
}
