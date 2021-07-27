import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    const all = this.categories;

    return all;
  }
  async findByName(name: string): Promise<Category> {
    const category = await this.categories.find(
      (category) => category.name === name
    );

    return category;
  }
}

export { CategoriesRepositoryInMemory };
