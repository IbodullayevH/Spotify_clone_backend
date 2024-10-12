import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) { }


  // create album 
  async create(createAlbumDto: CreateAlbumDto): Promise<{ success: boolean; message: string; data: Album }> {
    const album = this.albumsRepository.create(createAlbumDto);
    const newAlbum = await this.albumsRepository.save(album);
    return {
      success: true,
      message: `Successfully created album`,
      data: newAlbum
    }
  }


  // get all
  async findAll(): Promise<{ success: boolean; message: string; data: Album[] }> {
    try {
      let albumData = await this.albumsRepository.find({ relations: ['artist'] });

      return {
        success: true,
        message: `All album data`,
        data: albumData
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Xato yuz berdi');
    }
  }


  // get by id
  async findOne(id: number): Promise<{ success: boolean; message: string; data?: Album }> {
    const albumDataById = await this.albumsRepository.findOne({
      where: { id },
      relations: ['artist'],
    });

    if (!albumDataById) {
      return {
        success: false,
        message: 'Not found album'
      }
    }

    return {
      success: true,
      message: `${id}th album`,
      data: albumDataById,
    }
  }


  // update
  async update(id: number, userData: Partial<Album>): Promise<{ success: boolean; message: string; data?: Album }> {
    await this.albumsRepository.update(id, userData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ success: boolean; message: string; }> {

    let [checkUser] = await this.albumsRepository.findBy({
      id
    })

    if (!checkUser) {
      return {
        success: false,
        message: 'Not found album'
      }
    }
    await this.albumsRepository.delete(id);
    return {
      success: true,
      message: `Successfully delete album`,
    }
  }
}
