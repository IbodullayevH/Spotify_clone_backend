import { Module } from '@nestjs/common';
import { AlbumsGenresService } from './albums_genres.service';
import { AlbumsGenresController } from './albums_genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsGenres } from './entities/albums_genre.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Genre } from 'src/genres/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumsGenres, Album, Genre])],
  controllers: [AlbumsGenresController],
  providers: [AlbumsGenresService],
})
export class AlbumsGenresModule {}
