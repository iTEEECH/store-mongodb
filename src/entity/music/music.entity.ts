import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MusicEntity extends Document {
  @Prop()
  readonly title: string;

  @Prop()
  readonly singer: string;

  @Prop([String])
  readonly platform: string[];
}

export const MusicSchema = SchemaFactory.createForClass(MusicEntity);
