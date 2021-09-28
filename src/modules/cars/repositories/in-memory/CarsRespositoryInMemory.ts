import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    licence_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      licence_plate,
      name,
    } as ICreateCarDTO);

    this.cars.push(car);

    return car;
  }

  async findCarByLicencePlate(licence_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.licence_plate === licence_plate);

    return car;
  }
}

export { CarsRepositoryInMemory };
