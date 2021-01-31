import { Module } from '@nestjs/common';
import { MusicModule } from './music/music.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/store'),
    MusicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
