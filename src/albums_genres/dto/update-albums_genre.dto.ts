import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumsGenreDto } from './create-albums_genre.dto';

export class UpdateAlbumsGenreDto extends PartialType(CreateAlbumsGenreDto) {
    newAlbumId: number;
    newGenreId: number;
}
