import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicEntity, MusicSchema } from '../entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MusicEntity.name, schema: MusicSchema },
    ]),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
