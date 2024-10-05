import { Module } from '@nestjs/common';
<<<<<<< HEAD
import {TypeOrmModule } from '@nestjs/typeorm'
=======
import { TypeOrmModule } from '@nestjs/typeorm';
>>>>>>> d39ad963775fddf6ff43564b5da2e0eebdccc8cf
import { AlbumsModule } from 'src/albums/albums.module';
import { Album } from 'src/albums/entities/album.entity';
import { ArtistsModule } from 'src/arstists/arstists.module';
import { Artist } from 'src/arstists/entities/arstist.entity';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { Song } from 'src/songs/entities/song.entity';
import { SongsModule } from 'src/songs/songs.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
<<<<<<< HEAD
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
>>>>>>> d39ad963775fddf6ff43564b5da2e0eebdccc8cf

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
<<<<<<< HEAD
      password: '1111',
      database: 'spotify',
      entities: [User, Artist, Album, Song, Playlist],
      synchronize: true,
    }),
    UsersModule,
    ArtistsModule, 
=======
      password: '8077',
      database: 'spotify',
      entities: [User, Artist, Album, Song, Playlist],
      // synchronize: true,
      logging: true
    }),
    UsersModule,
    ArtistsModule,
>>>>>>> d39ad963775fddf6ff43564b5da2e0eebdccc8cf
    AlbumsModule,
    SongsModule,
    PlaylistsModule
  ],
})
export class AppModule {}
