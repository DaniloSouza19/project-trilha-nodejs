import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRespositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a car', async () => {
    await createCarUseCase.execute({
      name: 'Car name',
      brand: 'Car brand',
      category_id: '445454',
      daily_rate: 100,
      description: 'Description car',
      licence_plate: 'ABC7788',
    });
  });
});
