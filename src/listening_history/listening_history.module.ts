import { Module } from '@nestjs/common';
import { ListeningHistoryService } from './listening_history.service';
import { ListeningHistoryController } from './listening_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListeningHistory } from './entities/listening_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListeningHistory])],
  controllers: [ListeningHistoryController],
  providers: [ListeningHistoryService],
})
export class ListeningHistoryModule {}
