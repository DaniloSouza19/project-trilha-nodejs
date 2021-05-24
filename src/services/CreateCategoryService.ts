import { CategoriesRepository } from '../repositories/CategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ description, name }: IRequest): void {
    const categoryAlreadyExits = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExits) {
      throw new Error('Category already exits');
    }

    this.categoriesRepository.create({
      description,
      name,
    });
  }
}

export { CreateCategoryService };
