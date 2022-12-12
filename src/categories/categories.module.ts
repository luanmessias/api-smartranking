import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categorySchema } from './interfaces/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
