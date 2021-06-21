import { Specification } from '../entities/Specification';

interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecification): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecification };
