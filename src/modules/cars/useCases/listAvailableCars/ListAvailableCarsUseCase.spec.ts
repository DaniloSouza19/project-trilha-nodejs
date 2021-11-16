import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List all available cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('Should be able to list all available cars', async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: 'Some brand',
      fine_amount: 100,
      category_id: 'category_id',
      daily_rate: 110.0,
      description: 'car1',
      license_plate: 'ABC 12312',
      name: 'car1',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual(expect.arrayContaining([car1]));
  });

  it('Should be able to list all available cars by name', async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: 'Some brand',
      fine_amount: 100,
      category_id: 'category_id',
      daily_rate: 110.0,
      description: 'car1',
      license_plate: 'ABC 12312',
      name: 'car1',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'car1' });

    expect(cars).toEqual([car1]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: 'Some brand',
      fine_amount: 100,
      category_id: 'category_id',
      daily_rate: 110.0,
      description: 'car1',
      license_plate: 'ABC 12312',
      name: 'car1',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Some brand',
    });

    expect(cars).toEqual([car1]);
  });

  it('Should be able to list all available cars by Category id', async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: 'Some brand',
      fine_amount: 100,
      category_id: 'category_id',
      daily_rate: 110.0,
      description: 'car1',
      license_plate: 'ABC 12312',
      name: 'car1',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car1]);
  });
});
