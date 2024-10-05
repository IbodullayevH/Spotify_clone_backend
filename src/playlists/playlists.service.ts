import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PlaylistsService {
 constructor(
  @InjectRepository(Playlist)
  private readonly playlistRepository : Repository<Playlist>,
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
 ) {}

 async create(CreatePlaylistDto: CreatePlaylistDto): Promise<Playlist> {
  const { title, userId } = CreatePlaylistDto;
  const user = await this.userRepository.findOne({ where: { id: userId }})

  if(!user) {
    throw new NotFoundException(`User with ID ${userId} not found`)
  }

  const playlist = this.playlistRepository.create({ title, user})
  return this.playlistRepository.save(playlist)
 }

 findAll(): Promise<Playlist[]> {
  return this.playlistRepository.find({ relations: ['user']})
 }

async findOne(id: number): Promise<Playlist> {
  const playlist = await this.playlistRepository.findOne({ where: { id }, relations: ['user']})
if(!playlist) {
  throw new NotFoundException(`Playliest with ID ${id} not found`)
}
return playlist
 }

async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist>{
  const playlist = await this.playlistRepository.findOne({ where: { id }})
  if(!playlist) {
    throw new NotFoundException(`Playlist with ID ${id} not found`)
  }

  Object.assign(playlist, updatePlaylistDto);
  return this.playlistRepository.save(playlist)
}

async remove(id: number): Promise<void>{
  const playlist = await this.playlistRepository.findOne({ where: { id }})
  if(!playlist) {
    throw new NotFoundException(`Playlist with ID ${id} not found`)
  }
  await this.playlistRepository.remove(playlist)
}
}
