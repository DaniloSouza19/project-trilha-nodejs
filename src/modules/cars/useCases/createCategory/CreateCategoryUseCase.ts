import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExits = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExits) {
      throw new AppError('Category already exits');
    }

    await this.categoriesRepository.create({
      description,
      name,
    });
  }
}

export { CreateCategoryUseCase };
