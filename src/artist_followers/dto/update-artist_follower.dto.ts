import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistFollowerDto } from './create-artist_follower.dto';

export class UpdateArtistFollowerDto extends PartialType(CreateArtistFollowerDto) {
    artist_id?: number;
    user_id?: number;
}
