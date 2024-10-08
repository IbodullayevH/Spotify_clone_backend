import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PlaylistSong } from './entities/playlist_song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistSongsService {
constructor(
  @InjectRepository(PlaylistSong)
  private readonly playlistSongRepository : Repository<PlaylistSong> ,
) {}

async create(playlistData:Partial<PlaylistSong>) :Promise<PlaylistSong> {
  const playlistSong = this.playlistSongRepository.create(playlistData)
  return this.playlistSongRepository.save(playlistSong)
}

async findAll(): Promise<PlaylistSong[]> {
  return this.playlistSongRepository.find()
}

async findOne(id: number): Promise<PlaylistSong> {
  const playlistSong = await this.playlistSongRepository.findOne({ where: { id }})
  if(!playlistSong) {
    throw new NotFoundException(`PlaylistSong ${id} not found`)
  }
  return playlistSong
}

async update(id: number, updateDate: Partial<PlaylistSong>): Promise<PlaylistSong> {
  const playListSong = await this.playlistSongRepository.findOne({ where: { id }})
  if(!playListSong) {
    throw new NotFoundException(`Cannot update. PlaylistSong not found with playlist_id: ${id}`)
  }
  await this.playlistSongRepository.update(id, updateDate)
  return this.findOne(id)
}

async remove(id: number): Promise<void> {
  const playListSong = await this.playlistSongRepository.findOne({ where: { id }})
  if(!playListSong) {
    throw new NotFoundException(`Cannot remove. PlaylistSong ${id} not found`)
  }
  await this.playlistSongRepository.delete({id})
}
}
