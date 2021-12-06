import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';

let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Add car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Some brand',
      fine_amount: 100,
      category_id: 'category_id',
      daily_rate: 110.0,
      description: 'car1',
      license_plate: 'ABC 12312',
      name: 'car1',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    await createCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });
  });

  it('Should not be able to add a new specification to non-existing car', async () => {
    await expect(
      createCarSpecificationsUseCase.execute({
        car_id: 'abc',
        specifications_id: ['non-existing-car'],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
