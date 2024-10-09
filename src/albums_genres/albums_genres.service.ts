import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumsGenreDto } from './dto/create-albums_genre.dto';
import { UpdateAlbumsGenreDto } from './dto/update-albums_genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsGenres } from './entities/albums_genre.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsGenresService {
  constructor(
    @InjectRepository(AlbumsGenres)
    private albumGenresRepository: Repository<AlbumsGenres>,
    
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>
  ) {}

  async create(createAlbumsGenreDto: CreateAlbumsGenreDto): Promise<AlbumsGenres> {
    const { album_id, genre_id } = createAlbumsGenreDto

    const albumExists = await this.albumRepository.findOne({ where: { id: album_id}})
    if(!albumExists) {
      throw new NotFoundException('Album not found')
    }

   const genreExists = await this.genreRepository.findOne({ where: { id: genre_id}})
   if(!genreExists) {
    throw new NotFoundException('Genre not found')
   }

   const existingRelation = await this.albumGenresRepository.findOne({ where:  { album_id, genre_id}})
   if(existingRelation) {
    throw new ConflictException('This album-genre combination already exists')
   }
   const albumGenres = this.albumGenresRepository.create(createAlbumsGenreDto)
   return this.albumGenresRepository.save(albumGenres)
  }

  async findAll(): Promise<AlbumsGenres[]> {
    return this.albumGenresRepository.find({ relations: ['album', 'genre']})
  }

  async findById(album_id: number, genre_id: number): Promise<AlbumsGenres> {
    const relation = await this.albumGenresRepository.findOne({ where: { album_id, genre_id}})
    if(!relation) {
      throw new NotFoundException('Album-Genre relation not found')
    }
    return relation
  }

async update(album_id: number, genre_id: number, newAlbumId: number, newGenreId: number): Promise<AlbumsGenres> {

  const relation = await this.findById(album_id, genre_id);
  
  const newAlbumExists = await this.albumRepository.findOne({ where: { id: newAlbumId } });
  if (!newAlbumExists) {
    throw new NotFoundException('New Album not found');
  }

  const newGenreExists = await this.genreRepository.findOne({ where: { id: newGenreId } });
  if (!newGenreExists) {
    throw new NotFoundException('New Genre not found');
  }

  const existingRelation = await this.albumGenresRepository.findOne({ where: { album_id: newAlbumId, genre_id: newGenreId } });
  if (existingRelation) {
    throw new ConflictException('This new album-genre combination already exists');
  }

  relation.album_id = newAlbumId;
  relation.genre_id = newGenreId;

  return this.albumGenresRepository.save(relation);
}


  async remove(album_id: number, genre_id: number): Promise<void> {
    const relation =  await this.findById(album_id, genre_id)
    await this.albumGenresRepository.delete({album_id, genre_id})
  }
}
