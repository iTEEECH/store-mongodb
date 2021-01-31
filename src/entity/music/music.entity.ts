import { Schema, Prop, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MusicEntity extends Document {
  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop([String])
  flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(MusicEntity);

MongooseModule.forFeature([
  {
    name: MusicEntity.name,
    schema: CoffeeSchema,
  },
]);
