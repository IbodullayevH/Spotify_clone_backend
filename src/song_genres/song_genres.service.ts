import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongGenreDto } from './dto/create-song_genre.dto';
import { UpdateSongGenreDto } from './dto/update-song_genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SongGenres } from './entities/song_genre.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/entities/song.entity';
import { Genre } from 'src/genres/entities/genre.entity';

@Injectable()
export class SongGenresService {
  constructor(
    @InjectRepository(SongGenres)
    private songGenrerepository: Repository<SongGenres>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>
  ) {}

  async create(createSongGenreDto: CreateSongGenreDto): Promise<SongGenres> {
    const songExists = await this.songRepository.findOne({
      where: {id: createSongGenreDto.song_id}
    })
    if(!songExists) { 
      throw new NotFoundException('Song not found')
    }

    const genreExists = await this.genreRepository.findOne({
      where: { id: createSongGenreDto.genre_id}
    })
    if(!genreExists) {
      throw new NotFoundException('Genre not found')
    }

    const existing = await this.songGenrerepository.findOne({ where: { song_id: createSongGenreDto.song_id, genre_id: createSongGenreDto.genre_id}})
    if(existing) {
      throw new ConflictException('This song-genre combination already existing')
    }
    const songGenre = this.songGenrerepository.create(createSongGenreDto)
    return await this.songGenrerepository.save(songGenre)
  }
  
 async findAll(): Promise<SongGenres[]> {
  return await this.songGenrerepository.find()
 }

 async findById(song_id: number, genre_id: number): Promise<SongGenres> {
  const songGenre = await this.songGenrerepository.findOne({
    where: {song_id, genre_id}
  })
  if(!songGenre) {
    throw new NotFoundException('Song-Genre not found')
  }
  return songGenre
 }

 async update(song_id: number, genre_id: number, updateSongGenreDto: UpdateSongGenreDto): Promise<SongGenres> {
  const songGenre = await this.findById(song_id, genre_id)
  if(!songGenre) {
    throw new NotFoundException('Song-genre not found')
  }

  if (updateSongGenreDto.song_id && updateSongGenreDto.genre_id) {
    const existing = await this.songGenrerepository.findOne({
      where: { song_id: updateSongGenreDto.song_id, genre_id: updateSongGenreDto.genre_id },
    });

    if (existing) {
      throw new ConflictException('This song-genre combination already exists');
    }
  }
  await this.songGenrerepository.update({song_id, genre_id}, updateSongGenreDto)
  return this.findById(song_id, genre_id)
 }

 async remove(song_id: number, genre_id: number): Promise<void> {
  const songGenre = await this.findById(song_id, genre_id)
  if(!songGenre) {
    throw new NotFoundException('Song-Genre not found')
  }
  await this.songGenrerepository.delete({ song_id, genre_id})
 }
}
