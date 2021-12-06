import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListAvailableCarsDTO } from '@modules/cars/dtos/IListAvailableCarsDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    brand,
    category_id,
    daily_rate,
    description,
    license_plate,
    fine_amount,
    name,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      brand,
      category_id,
      daily_rate,
      description,
      license_plate,
      fine_amount,
      name,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    const queryBuilder = this.repository
      .createQueryBuilder()
      .where('available = true');

    if (brand) {
      queryBuilder.andWhere('brand = :brand', { brand });
    }
    if (category_id) {
      queryBuilder.andWhere('category_id = :category_id', { category_id });
    }

    if (name) {
      queryBuilder.andWhere('name = :name', { name });
    }

    const cars = await queryBuilder.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    return this.repository.findOne(car_id);
  }
}

export { CarsRepository };
