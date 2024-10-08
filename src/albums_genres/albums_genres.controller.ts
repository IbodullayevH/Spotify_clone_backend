import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumsGenresService } from './albums_genres.service';
import { CreateAlbumsGenreDto } from './dto/create-albums_genre.dto';
import { UpdateAlbumsGenreDto } from './dto/update-albums_genre.dto';

@Controller('albums-genres')
export class AlbumsGenresController {
  constructor(private readonly albumsGenresService: AlbumsGenresService) {}

  @Post()
  create(@Body() createAlbumsGenreDto: CreateAlbumsGenreDto) {
    return this.albumsGenresService.create(createAlbumsGenreDto);
  }

  @Get()
  findAll() {
    return this.albumsGenresService.findAll();
  }

  @Get(':album_id/:genre_id')
  findOne(@Param('album_id') album_id: string,
@Param('genre_id') genre_id: string
) {
    return this.albumsGenresService.findById(+album_id, +genre_id);
  }

  @Patch(':album_id/:genre_id')
  update(
    @Param('album_id') album_id: string, 
    @Param('genre_id') genre_id: string,
    @Body() updateAlbumsGenreDto: UpdateAlbumsGenreDto,
  ) {
    const { newAlbumId, newGenreId } = updateAlbumsGenreDto;
    return this.albumsGenresService.update(+album_id, +genre_id, newAlbumId, newGenreId);
  }

  @Delete(':album_id/:genre_id')
  remove(
    @Param('album_id') album_id: string, 
    @Param('genre_id') genre_id: string,
  ) {
    return this.albumsGenresService.remove(+album_id, +genre_id);
  }
}
