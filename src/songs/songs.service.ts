import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity'
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>
  ) {}


  async create(createSongDto: CreateSongDto): Promise<Song> {
    const { album_id, ...songData } = createSongDto;
    const album = await this.albumRepository.findOne({ where: { id: album_id } });

    if (!album) {
      throw new NotFoundException(`Album with id ${album_id} not found`);
    }

    const song = this.songsRepository.create({ ...songData, album });
    return this.songsRepository.save(song);
  }

  findAll() {
    return this.songsRepository.find({relations: ['album', 'album.artist']})
  }

 async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOne({where: { id }, relations: ['album', 'album.artist']})
    if(!song) {
      throw new NotFoundException(`Song with ID ${id} not found`)
    }
    return song
  }

  async update(id: number, UpdateSongDto: UpdateSongDto) {
    const song = await this.songsRepository.findOne({ where: { id }, relations: ['album']})
    if(!song) {
      throw new NotFoundException(`Song with ID ${id} not found`)
    }
    const { album_id, ...updateDate } = UpdateSongDto
    if(album_id){
      const album = await this.albumRepository.findOne({where: {id: album_id}})
      if(!album) {
        throw new NotFoundException(`Album with ID ${album_id} not found`)
      }
      song.album = album
    }
    Object.assign(song, updateDate)
    return this.songsRepository.save(song)
  }

  async remove(id: number){
    const song = await this.songsRepository.findOne({where: { id }})
    if(!song){
      throw new NotFoundException(`Song with ID ${id} not found `)
    }
    return this.songsRepository.delete(id)
  }
 }
