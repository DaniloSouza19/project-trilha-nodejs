import { AppError } from '@shared/errors/AppError';

import { RentalsRepositoryInMemory } from '../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create a Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('Should be able to create a rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: 'some-car-id',
      expected_return_date: new Date(),
      user_id: 'some-user-id',
    });

    expect(rental).toHaveProperty('id');
  });

  it('Should not be able to create a rental from user which already have open rental', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'some-car',
        expected_return_date: new Date(),
        user_id: 'same-user-test',
      });

      await createRentalUseCase.execute({
        car_id: 'another-car',
        expected_return_date: new Date(),
        user_id: 'same-user-test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a rental from car which already have open rental', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'same-car-test',
        expected_return_date: new Date(),
        user_id: 'some-user',
      });

      await createRentalUseCase.execute({
        car_id: 'same-car-test',
        expected_return_date: new Date(),
        user_id: 'another-user',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
