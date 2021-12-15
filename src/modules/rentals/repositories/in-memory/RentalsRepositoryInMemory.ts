import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalsByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return rentals;
  }

  async findOpenRentalsByCarId(car_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
