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

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PlaylistSong>{
return this.playlistSongsService.findOne(id)
  } 

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDate: Partial<PlaylistSong>): Promise<PlaylistSong> {
    return this.playlistSongsService.update(id, updateDate)
  }

  @Delete(':id')
 async remove(@Param('id') id: number): Promise<void> {
    return this.playlistSongsService.remove(id);
  }
}
