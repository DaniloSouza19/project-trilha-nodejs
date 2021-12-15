import { AppError } from '@shared/errors/AppError';

import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

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

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
