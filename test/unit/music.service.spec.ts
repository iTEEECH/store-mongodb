import { Test, TestingModule } from '@nestjs/testing';
import { MusicService } from '../../src/music/music.service';
import { MusicDto } from '../../src/dto';

describe('MusicService', () => {
  let service: MusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicService,
      ],
    }).compile();

    service = module.get<MusicService>(MusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all musics', () => {
    expect(service.findAll().length).toBe(3);
  });

  it('should return a music', () => {
    expect(service.findById('1').singer).toBe('Lady Gaga');
  });

  describe('actions', () => {

    it('should create a music', () => {
      // Given

      // When
      service.create(<MusicDto>{ singer: 'Lady Gaga', title: 'Chromatica', platform: ['Apple music', 'Spotify']});

      // Then
      expect(service.findAll().length).toBe(4);
      expect(service.findById('4').title).toBe('Chromatica');
    });

    it('should update a music', () => {
      // Given

      // When
      service.update('1', <MusicDto>{ id: 1, singer: 'Lady Gaga', title: 'Chromatica', platform: ['Deezer', 'Spotify', 'Apple music', 'Youtube']});

      // Then
      expect(service.findById('1').title).toBe('Chromatica');
    });

    it('should delete a music', () => {
      // Given

      // When
      service.delete('1');

      // Then
      expect(service.findAll().length).toBe(2);
    });
  });

});
