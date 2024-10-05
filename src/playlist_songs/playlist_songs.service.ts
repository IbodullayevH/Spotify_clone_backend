import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistSongDto } from './dto/create-playlist_song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist_song.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Injector } from '@nestjs/core/injector/injector';
import { PlaylistSong } from './entities/playlist_song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistSongsService {
constructor(
  @InjectRepository(PlaylistSong)
  private readonly playlistSongRepository : Repository<PlaylistSong> ,
) {}

async create(playlistSong: PlaylistSong): Promise<PlaylistSong> {
  return this.playlistSongRepository.save(playlistSong)
}

async findAll(): Promise<PlaylistSong[]> {
  return this.playlistSongRepository.find()
}

async findOne(playlist_id: number, song_id: number): Promise<PlaylistSong> {
  const playlistSong = await this.playlistSongRepository.findOneBy({ playlist_id,  song_id})
  if(!playlistSong) {
    throw new NotFoundException(`PlaylistSong not found with playlist_id: ${playlist_id} and song_id: ${song_id}`)
  }
  return playlistSong
}

async update(playlistSong: PlaylistSong): Promise<PlaylistSong> {
  const existingPlayListSong = await this.findOne(playlistSong.playlist_id, playlistSong.song_id)
  if(!existingPlayListSong) {
    throw new NotFoundException(`Cannot update. PlaylistSong not found with playlist_id: ${playlistSong.playlist_id} and song_id: ${playlistSong.song_id}`)
  }
  await this.playlistSongRepository.update({ playlist_id: playlistSong.playlist_id, song_id: playlistSong.song_id}, playlistSong)
  return this.findOne(playlistSong.playlist_id, playlistSong.song_id)
}

async remove(playlist_id: number, song_id: number): Promise<void> {
  const existingPlayListSong = await this.findOne(playlist_id, song_id)
  if(!existingPlayListSong) {
    throw new NotFoundException(`Cannot remove. PlaylistSong not found with playlist_id: ${playlist_id} and song_id: ${song_id}`)
  }
  await this.playlistSongRepository.delete({playlist_id, song_id})
}
}
