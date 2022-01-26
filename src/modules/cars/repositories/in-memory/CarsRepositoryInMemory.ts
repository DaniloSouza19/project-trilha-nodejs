import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListAvailableCarsDTO } from '@modules/cars/dtos/IListAvailableCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    id,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    const cars = this.cars.filter(
      (car) =>
        car.available === true ||
        car.category_id === category_id ||
        car.brand === brand ||
        car.name === name
    );

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }

  async setAvailable(car_id: string, isAvailable: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === car_id);

    this.cars[carIndex].available = isAvailable;
  }
}

export { CarsRepositoryInMemory };
