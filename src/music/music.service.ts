import { Injectable, NotFoundException } from '@nestjs/common';
import { MusicDto } from '../dto';
import { MusicEntity } from '../entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MusicService {
  /**
   * @name constructor
   * @param { Model<MusicEntity> } musicEntityModel
   */
  constructor(
    @InjectModel(MusicEntity.name)
    private readonly musicEntityModel: Model<MusicEntity>,
  ) {}

  /**
   * @name findAll
   * @description fetch all musics.
   * @return { Promise<MusicEntity[]> }
   */
  async findAll(): Promise<MusicEntity[]> {
    const result: MusicEntity[] = await this.musicEntityModel.find().exec();

    if (!result) {
      throw new NotFoundException('Musics not found.');
    }

    return result;
  }

  /**
   * @name findById
   * @description fetch one music from id.
   * @param { string } id : Music's id
   * @return { Promise<MusicEntity> }
   */
  async findById(id: string): Promise<MusicEntity> {
    const result: MusicEntity = await this.musicEntityModel
      .findOne({ _id: id })
      .exec();

    if (!result) {
      throw new NotFoundException(`Music #${id} not found.`);
    }
    return result;
  }

  /**
   * @name create
   * @description create new music.
   * @param { MusicDto } music : Music's object
   */
  async create(music: MusicDto) {
    const model: MusicEntity = await new this.musicEntityModel(MusicDto);
    return model.save();
  }

  /**
   * @name update
   * @description update one music from id.
   * @param { string } id : Music's id
   * @param { MusicDto } music : Music's object
   */
  async update(id: string, music: MusicDto) {
    const result: MusicEntity = await this.musicEntityModel
      .findOneAndUpdate({ _id: id }, { $set: music }, { new: true })
      .exec();

    if (!result) {
      throw new NotFoundException(`Music #${id} not found.`);
    }
    return result;
  }

  /**
   * @name delete
   * @description delete one music from id.
   * @param { string } id : Music's id
   */
  async delete(id: string) {
    const model: MusicEntity = await this.findById(id);
    return model.remove();
  }
}
