import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { title } = createCategoryDto;
    const categoryFound = await this.categoryModel.findOne({ title }).exec();

    if (categoryFound) {
      throw new BadRequestException(`Category ${title} already exists`);
    }

    const createdCategory = new this.categoryModel(createCategoryDto);
    return await createdCategory.save();
  }
}
