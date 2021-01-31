import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MusicDto } from '../../src/dto';
import { MusicService } from '../../src/music/music.service';
import { MusicModule } from '../../src/music/music.module';

describe('Music', () => {
  class MockMusicService extends MusicService {
    findAll() : MusicDto[] {
      return [{ id: 1, singer: 'Lady Gaga', title: 'Stupid love', platform: [] }];
    }
  }

  let app: INestApplication;
  let service: MusicService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MusicModule],
    })
      .overrideProvider(MusicService)
      .useClass(MockMusicService)
      .compile();

    app = module.createNestApplication();
    service = module.get(MusicService);
    await app.init();
  });

  it(`/GET musics`, () => {
    return request(app.getHttpServer())
      .get('/music')
      .expect(200)
      .expect(service.findAll());
  });

  it(`/GET music`, () => {
    return request(app.getHttpServer())
      .get('/music/1')
      .expect(200)
      .expect(service.findById('1'));
  });

  it(`/POST music`, () => {
    return request(app.getHttpServer())
      .post('/music')
      .expect(201);
  });

  it(`/PATCH music`, () => {
    return request(app.getHttpServer())
      .patch('/music/1')
      .expect(200);
  });

  it(`/DELETE music`, () => {
    return request(app.getHttpServer())
      .delete('/music/1')
      .expect(204);
  });
  afterAll(async () => {
    await app.close();
  });
});
