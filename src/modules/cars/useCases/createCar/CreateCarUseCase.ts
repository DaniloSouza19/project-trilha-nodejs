import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  licence_plate: string;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    licence_plate,
    name,
  }: IRequest): Promise<void> {
    await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      licence_plate,
      name,
    });
  }
}

export { CreateCarUseCase };
