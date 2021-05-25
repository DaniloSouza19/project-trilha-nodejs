import { Category } from '../models/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

class PostgresRepository implements ICategoriesRepository {
  create({ description, name }: ICreateCategoryDTO): void {
    console.log(name);
    return null;
  }
  list(): Category[] {
    return null;
  }
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
}

export { PostgresRepository };
