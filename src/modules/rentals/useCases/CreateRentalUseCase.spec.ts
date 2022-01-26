import { addHours } from 'date-fns';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { DateFnsDateProvider } from '@shared/container/providers/dateProvider/implementations/DateFnsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { RentalsRepositoryInMemory } from '../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateFnsDateProvider: DateFnsDateProvider;

describe('Create a Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dateFnsDateProvider = new DateFnsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateFnsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('Should be able to create a rental', async () => {
    const { id } = await carsRepositoryInMemory.create({
      name: 'Car name',
      brand: 'Car brand',
      category_id: '445454',
      daily_rate: 100,
      description: 'Description car',
      license_plate: 'ABC7788',
      fine_amount: 60,
    });

    const rental = await createRentalUseCase.execute({
      car_id: id,
      expected_return_date: addHours(new Date(), 25),
      user_id: 'some-user-id',
    });

    expect(rental).toHaveProperty('id');
  });

  it('Should not be able to create a rental from user which already have open rental', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Some car',
      brand: 'Car brand',
      category_id: '445454',
      daily_rate: 100,
      description: 'Description car',
      license_plate: 'ABC7789',
      fine_amount: 60,
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Another car',
      brand: 'Car brand',
      category_id: '445454',
      daily_rate: 120,
      description: 'Other Description car',
      license_plate: 'ABC7788',
      fine_amount: 50,
    });

    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: car1.id,
        expected_return_date: addHours(new Date(), 25),
        user_id: 'same-user-test',
      });

      await createRentalUseCase.execute({
        car_id: car2.id,
        expected_return_date: addHours(new Date(), 25),
        user_id: 'same-user-test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a rental from car which already have open rental', async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: 'Some car',
      brand: 'Car brand',
      category_id: '445454',
      daily_rate: 100,
      description: 'Description car',
      license_plate: 'ABC7789',
      fine_amount: 60,
    });

    await expect(async () => {
      await createRentalUseCase.execute({
        car_id,
        expected_return_date: addHours(new Date(), 25),
        user_id: 'some-user',
      });

      await createRentalUseCase.execute({
        car_id,
        expected_return_date: addHours(new Date(), 25),
        user_id: 'another-user',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a rental with expected return date before 24 hours', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'same-car-test',
        expected_return_date: addHours(new Date(), 23),
        user_id: 'another-user',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update available car to false', async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: 'Some car',
      brand: 'Car brand',
      category_id: '445454',
      daily_rate: 100,
      description: 'Description car',
      license_plate: 'ABC7789',
      fine_amount: 60,
    });

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date: addHours(new Date(), 25),
      user_id: 'some-user-id',
    });

    expect(rental).toHaveProperty('id');

    const car = await carsRepositoryInMemory.findById(car_id);

    expect(car.available).toBe(false);
  });
});
