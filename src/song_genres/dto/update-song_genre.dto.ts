import { PartialType } from '@nestjs/mapped-types';
import { CreateSongGenreDto } from './create-song_genre.dto';

export class UpdateSongGenreDto extends PartialType(CreateSongGenreDto) {}
