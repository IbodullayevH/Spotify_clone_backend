import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListeningHistoryDto } from './dto/create-listening_history.dto';
import { UpdateListeningHistoryDto } from './dto/update-listening_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListeningHistory } from './entities/listening_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListeningHistoryService {
  constructor(
    @InjectRepository(ListeningHistory)
    private readonly listeningHistoryReository: Repository<ListeningHistory>,
  ) {}

  async create(historyDate: Partial<ListeningHistory>): Promise<ListeningHistory> {
    const history = this.listeningHistoryReository.create(historyDate)
    return this.listeningHistoryReository.save(history)
  }

  async findAll(): Promise<ListeningHistory[]> {
    return this.listeningHistoryReository.find()
  }

  async findOne(id: number): Promise<ListeningHistory> {
    const history = await this.listeningHistoryReository.findOne({ where: { id }})
    if(!history) {
     throw new NotFoundException(`Listening history with id ${id} not found`)
    }
    return history
  }

  async update(id: number, updateDate: Partial<ListeningHistory>): Promise<ListeningHistory>{
    const history = await this.findOne(id)
    if(!history){
      throw new NotFoundException(`Cannot update. Listening history with id ${id} not found`)
    }
    await this.listeningHistoryReository.update(id, updateDate)
    return this.findOne(id)
  }

  async delete(id: number): Promise<void> {
    const history = await this.findOne(id)
    if(!history) {
      throw new NotFoundException(`Cannot update. Listening history with id ${id} not found`)
    }
    await this.listeningHistoryReository.delete(id)
  }
}
