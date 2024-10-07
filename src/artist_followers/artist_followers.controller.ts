import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistFollowersService } from './artist_followers.service';
import { CreateArtistFollowerDto } from './dto/create-artist_follower.dto';


@Controller('artist-followers')
export class ArtistFollowersController {
  constructor(private readonly artistFollowersService: ArtistFollowersService) {}
  @Post()
  create(@Body() createArtistFollowerDto: CreateArtistFollowerDto) {
    return this.artistFollowersService.create(createArtistFollowerDto);
  }

  @Get()
  findAll() {
    return this.artistFollowersService.findAll();
  }

  @Get(':artist_id/:user_id')
  findOne(@Param('artist_id') artist_id: string, @Param('user_id') user_id: string) {
    return this.artistFollowersService.findOne(+artist_id, +user_id);
  }

  @Delete(':artist_id/:user_id')
  remove(@Param('artist_id') artist_id: string, @Param('user_id') user_id: string) {
    return this.artistFollowersService.remove(+artist_id, +user_id);
  }
}
