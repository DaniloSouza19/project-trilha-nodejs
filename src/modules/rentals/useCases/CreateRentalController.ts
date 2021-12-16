import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DateFnsDateProvider } from '@shared/container/providers/dateProvider/implementations/DateFnsDateProvider';

import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body;
    const { id } = request.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const dateProvider = new DateFnsDateProvider();

    const parsedDate = dateProvider.stringDateToIso(expected_return_date);

    const rental = await createRentalUseCase.execute({
      expected_return_date: parsedDate,
      car_id,
      user_id: id,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
