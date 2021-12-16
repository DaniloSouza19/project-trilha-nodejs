import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  private MINIMUM_RENT_TIME_IN_HOURS = 24;

  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const openUserRentals =
      await this.rentalsRepository.findOpenRentalsByUserId(user_id);

    if (openUserRentals.length > 0) {
      throw new AppError('Exists open rentals from this user');
    }

    const openCarRental = await this.rentalsRepository.findOpenRentalsByCarId(
      car_id
    );

    if (openCarRental.length > 0) {
      throw new AppError('Exists open rentals from this car');
    }

    const differenceRentTime = this.dateProvider.differenceInHours(
      expected_return_date,
      new Date()
    );

    if (differenceRentTime < this.MINIMUM_RENT_TIME_IN_HOURS) {
      throw new AppError(
        `Expected return Date must be at least ${this.MINIMUM_RENT_TIME_IN_HOURS} hours`
      );
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
