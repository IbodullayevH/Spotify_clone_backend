import { Module } from '@nestjs/common';
import { SongGenresService } from './song_genres.service';
import { SongGenresController } from './song_genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongGenres } from './entities/song_genre.entity';
import { Genre } from 'src/genres/entities/genre.entity'; 
import { SongsModule } from 'src/songs/songs.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([SongGenres, Genre]), 
    SongsModule, 
  ],
  controllers: [SongGenresController],
  providers: [SongGenresService],
})
export class SongGenresModule {}
