import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>
  ) {}

  findAll(): Promise<Genre[]> {
    return this.genresRepository.find()
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genresRepository.findOne({ where: { id }})
    if(!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`)
    }
    return genre;
  }

  create(genre: Genre) : Promise<Genre> {
    return this.genresRepository.save(genre)
  }


  // update
  async update(id: number, genre: Genre): Promise<Genre> {
    const existingGenre = await this.findOne(id)
    if(!existingGenre) {
      throw new NotFoundException(`Genre with ID ${id} not found`)
    }
    await this.genresRepository.update(id, genre)
    return this.genresRepository.findOne({ where: { id }})
  }

  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id)
    if(!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`)
    }
    await this.genresRepository.delete(id)
  }
}
