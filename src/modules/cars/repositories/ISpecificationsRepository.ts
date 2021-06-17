import { Specification } from '../entities/Specification';

interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecification): void;
  findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecification };
