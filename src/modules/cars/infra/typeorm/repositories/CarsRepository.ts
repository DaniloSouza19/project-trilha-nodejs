import { Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    licence_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      licence_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findCarByLicencePlate(licence_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        licence_plate,
      },
    });

    return car;
  }
}

export { CarsRepository };
