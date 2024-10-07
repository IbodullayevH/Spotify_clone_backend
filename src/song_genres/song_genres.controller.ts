import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SongGenresService } from './song_genres.service';
import { CreateSongGenreDto } from './dto/create-song_genre.dto';
import { UpdateSongGenreDto } from './dto/update-song_genre.dto';

@Controller('song-genres')
export class SongGenresController {
  constructor(private readonly songGenresService: SongGenresService) {}

  @Post()
  create(@Body() createSongGenreDto: CreateSongGenreDto) {
    return this.songGenresService.create(createSongGenreDto);
  }

  @Get()
  async findAll() {
    return this.songGenresService.findAll();
  }

  @Get(':song_id/:genre_id')
  async findOne(@Param('song_id') song_id: number, @Param('genre_id') genre_id: number) {
    return this.songGenresService.findById(song_id, genre_id);
  }

  @Patch(':song_id/:genre_id')
  async update(
    @Param('song_id') song_id: number,
    @Param('genre_id') genre_id: number,
    @Body() updateSongGenreDto: UpdateSongGenreDto,
  ) {
    return this.songGenresService.update(song_id, genre_id, updateSongGenreDto);
  }

  @Delete(':song_id/:genre_id')
  async remove(@Param('song_id') song_id: number, @Param('genre_id') genre_id: number) {
    return this.songGenresService.remove(song_id, genre_id);
  }
}
