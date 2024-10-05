import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Artist } from './entities/arstist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private usersRepository: Repository<Artist>,
  ) {}

  async create(userData: Partial<Artist>): Promise<Artist> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<Artist[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Artist> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, userData: Partial<Artist>): Promise<Artist> {
    await this.usersRepository.update(id, userData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
