import { Specification } from '../infra/typeorm/entities/Specification';

interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecification): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecification };
