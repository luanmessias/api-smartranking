import { IsArray, IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';
import { Event } from '../interfaces/category.interface';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  readonly events: Array<Event>;
}
