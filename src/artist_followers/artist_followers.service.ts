import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistFollowerDto } from './dto/create-artist_follower.dto';
import { UpdateArtistFollowerDto } from './dto/update-artist_follower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistFollower } from './entities/artist_follower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistFollowersService {
  constructor(
    @InjectRepository(ArtistFollower)
    private readonly artistFollowersRepository: Repository<ArtistFollower> 
  ) {}
  
  async create(createArtistFollowerDto: CreateArtistFollowerDto): Promise<ArtistFollower> {
    const { artist_id, user_id } = createArtistFollowerDto

    const existingRelation = await this.artistFollowersRepository.findOne({where: {artist_id, user_id}})
    if(existingRelation) {
      throw new ConflictException('This user is already following the artist')
    }
    const artistFollower = this.artistFollowersRepository.create(createArtistFollowerDto)
    return this.artistFollowersRepository.save(artistFollower)
  }
  async findAll(): Promise<ArtistFollower[]> {
    return this.artistFollowersRepository.find()
  }

  async findOne(artist_id: number, user_id: number): Promise<ArtistFollower> {
    const artistFollower = await this.artistFollowersRepository.findOne({where: {artist_id, user_id}})
    if(!artistFollower) {
      throw new NotFoundException('Artist-Follower reletion not found')
    }
    return artistFollower
  }

  async remove(artist_id: number, user_id: number): Promise<void> {
    const result = await this.artistFollowersRepository.delete({ artist_id, user_id})
    if(result.affected === 0){
      throw new NotFoundException('Artist-follower relation not found')
    }
  }
}
