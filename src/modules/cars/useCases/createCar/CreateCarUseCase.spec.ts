import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRespositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      brand: 'Car brand',
      category_id: '445454',
      daily_rate: 100,
      description: 'Description car',
      licence_plate: 'ABC7788',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with an already existing license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 1',
        brand: 'Car brand',
        category_id: '445454',
        daily_rate: 100,
        description: 'Description car',
        licence_plate: 'ABC7788',
      });

      await createCarUseCase.execute({
        name: 'Car 2',
        brand: 'Car 2 brand',
        category_id: '445454',
        daily_rate: 100,
        description: 'Car 2 Description',
        licence_plate: 'ABC7788',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a car with availability true by defaults', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      brand: 'Car brand',
      category_id: '445454',
      daily_rate: 100,
      description: 'Description car',
      licence_plate: 'ABC7788',
    });

    expect(car.available).toBe(true);
  });
});
