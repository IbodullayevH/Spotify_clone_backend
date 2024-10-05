import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from 'src/arstists/entities/arstist.entity';
import { Song } from 'src/songs/entities/song.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Song])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
