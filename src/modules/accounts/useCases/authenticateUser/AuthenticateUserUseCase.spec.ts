import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456',
      email: 'john@test.com',
      name: 'John Doe',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate a non existing user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'nonexisting@test.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate user with an incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '999',
        email: 'john@test.com',
        name: 'John Doe',
        password: '1234',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
