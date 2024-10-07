import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { PlaylistSong } from 'src/playlist_songs/entities/playlist_song.entity';
import { PlaylistSongsModule } from 'src/playlist_songs/playlist_songs.module';
import { ListeningHistory } from 'src/listening_history/entities/listening_history.entity';
import { ListeningHistoryModule } from 'src/listening_history/listening_history.module';
import { Genre } from 'src/genres/entities/genre.entity';
import { GenresModule } from 'src/genres/genres.module';
import { SongGenres } from 'src/song_genres/entities/song_genre.entity';
import { SongGenresModule } from 'src/song_genres/song_genres.module';
import { AlbumsGenres } from 'src/albums_genres/entities/albums_genre.entity';
import { AlbumsGenresModule } from 'src/albums_genres/albums_genres.module';
import { ArtistFollower } from 'src/artist_followers/entities/artist_follower.entity';
import { ArtistFollowersModule } from 'src/artist_followers/artist_followers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'spotify',
      entities: [User, Artist, Album, Song, Playlist, PlaylistSong, ListeningHistory, Genre, SongGenres, AlbumsGenres, ArtistFollower],
      synchronize: true,
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    SongsModule,
    PlaylistsModule,
    PlaylistSongsModule,
    ListeningHistoryModule,
    GenresModule,
    SongGenresModule,
    AlbumsGenresModule,
    ArtistFollowersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
