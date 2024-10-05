import { Module } from '@nestjs/common';
import {TypeOrmModule } from '@nestjs/typeorm'
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'spotify',
      entities: [User, Artist, Album, Song, Playlist],
      synchronize: true,
    }),
    UsersModule,
    ArtistsModule, 
    AlbumsModule,
    SongsModule,
    PlaylistsModule
  ],
})
export class AppModule {}
