import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findCarByLicencePlate(licence_plate: string): Promise<Car>;
}

export { ICarsRepository };