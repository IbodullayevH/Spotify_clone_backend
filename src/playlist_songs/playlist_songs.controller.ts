import { Controller, Get, Post, Param, Patch, Delete, Body } from '@nestjs/common';
import { PlaylistSongsService } from './playlist_songs.service';
import { PlaylistSong } from './entities/playlist_song.entity';

@Controller('playlist-songs')
export class PlaylistSongsController {
  constructor(private readonly playlistSongsService: PlaylistSongsService) {}

  @Post()
  create(@Body() playlistSong: PlaylistSong) {
    return this.playlistSongsService.create(playlistSong);
  }

  @Get()
  findAll() {
    return this.playlistSongsService.findAll();
  }

  @Get(':playlist_id/:song_id')
  findOne(@Param('playlist_id') playlist_id: number, @Param('song_id') song_id: number) {
    return this.playlistSongsService.findOne(playlist_id, song_id);
  }

  @Patch(':playlist_id/:song_id')
  update(@Param('playlist_id') playlist_id: number, @Param('song_id') song_id: number, @Body() playlistSong: PlaylistSong) {
    return this.playlistSongsService.update({ ...playlistSong, playlist_id, song_id });
  }

  @Delete(':playlist_id/:song_id')
  remove(@Param('playlist_id') playlist_id: number, @Param('song_id') song_id: number) {
    return this.playlistSongsService.remove(playlist_id, song_id);
  }
}
