import { PartialType } from '@nestjs/mapped-types';
import { CreateListeningHistoryDto } from './create-listening_history.dto';

export class UpdateListeningHistoryDto extends PartialType(CreateListeningHistoryDto) {
    song_id?: number;
    user_id?: number;
}
