import { PartialType } from '@nestjs/mapped-types';
import { CreateArstistDto } from './create-arstist.dto';

export class UpdateArstistDto extends PartialType(CreateArstistDto) {}
