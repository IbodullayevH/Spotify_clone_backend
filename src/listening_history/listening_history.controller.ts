import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListeningHistoryService } from './listening_history.service';
import { CreateListeningHistoryDto } from './dto/create-listening_history.dto';
import { UpdateListeningHistoryDto } from './dto/update-listening_history.dto';

@Controller('listening-history')
export class ListeningHistoryController {
  constructor(private readonly listeningHistoryService: ListeningHistoryService) {}

  @Post()
  create(@Body() createListeningHistoryDto: CreateListeningHistoryDto) {
    return this.listeningHistoryService.create(createListeningHistoryDto);
  }

  @Get()
  findAll() {
    return this.listeningHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listeningHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListeningHistoryDto: UpdateListeningHistoryDto) {
    return this.listeningHistoryService.update(+id, updateListeningHistoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.listeningHistoryService.delete(+id);
  }
}
