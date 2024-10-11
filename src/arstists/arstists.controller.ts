import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistsService } from './arstists.service';
import { CreateArstistDto } from './dto/create-arstist.dto';
import { UpdateArstistDto } from './dto/update-arstist.dto';

@Controller('artists')
export class ArstistsController {
  constructor(private readonly arstistsService: ArtistsService) {}

  @Post("new")
  create(@Body() createArstistDto: CreateArstistDto) {
    return this.arstistsService.create(createArstistDto);
  }

  @Get("all")
  findAll() {
    return this.arstistsService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.arstistsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateArstistDto: UpdateArstistDto) {
    return this.arstistsService.update(+id, updateArstistDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.arstistsService.remove(+id);
  }
}
