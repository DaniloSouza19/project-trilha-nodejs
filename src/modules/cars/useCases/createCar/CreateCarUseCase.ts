import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  licence_plate: string;
  fine_amount: number;
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
    fine_amount,
    name,
  }: IRequest): Promise<Car> {
    const licencePlateAlreadyExists =
      await this.carsRepository.findCarByLicencePlate(licence_plate);

    if (licencePlateAlreadyExists) {
      throw new AppError('Licence plate already exists');
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      licence_plate,
      fine_amount,
      name,
    });

    return car;
  }
}

export { CreateCarUseCase };
