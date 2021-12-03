import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Add car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
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

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id: 'def',
    });
  });

  it('Should not be able to add a new specification to non-existing car', async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: 'abc',
        specification_id: 'def',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
