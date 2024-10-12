import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Artist } from './entities/arstist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private usersRepository: Repository<Artist>,
  ) { }


  //  new artist  
  async create(userData: Partial<Artist>): Promise<Artist> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }


  // get all
  async findAll(): Promise<Artist[]> {
    return this.usersRepository.find();
  }


  // by id
  async findOne(id: number): Promise<{ success: boolean; message: string; data?: Artist }> {
    let [checkArtist] = await this.usersRepository.findBy({ id })
    if (!checkArtist) {
      return {
        success: false,
        message: 'Not found artist'
      }
    }
    return {
      success: true,
      message: `Artist by id ${id}`,
      data: checkArtist
    }
  }


  // update artist
  async update(id: number, userData: Partial<Artist>): Promise<{ success: boolean; message: string; data?: Artist }> {
    try {
      let [checkArtist] = await this.usersRepository.findBy({ id })
      if (!checkArtist) {
        return {
          success: false,
          message: 'Not found artist'
        }
      }

      await this.usersRepository.update(id, userData);
      return {
        success: true,
        message: `Artist successfully updated`,
        data: checkArtist
      }
    } catch (error: any) {
      return error.message
    }
  }


  // remove artist
  async remove(id: number): Promise<{ success: boolean; message: string; }> {
    let [checkUser] = await this.usersRepository.findBy({
      id
    })

    if (!checkUser) {
      return {
        success: false,
        message: 'Not found artist'
      }
    }
    await this.usersRepository.delete(id);
    return {
      success: true,
      message: `Successfully delete artist`,
    }
  }
}
