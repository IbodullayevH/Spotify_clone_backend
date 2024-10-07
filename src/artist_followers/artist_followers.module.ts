import { Module } from '@nestjs/common';
import { ArtistFollowersService } from './artist_followers.service';
import { ArtistFollowersController } from './artist_followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistFollower } from './entities/artist_follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistFollower])],
  controllers: [ArtistFollowersController],
  providers: [ArtistFollowersService],
})
export class ArtistFollowersModule {}
