import { Module } from '@nestjs/common';
import { ArtistsService } from './arstists.service';
import { ArstistsController } from './arstists.controller';
import { Artist } from './entities/arstist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArstistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}


