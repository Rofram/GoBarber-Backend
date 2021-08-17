import AppError from '@shared/errors/AppError';
import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakerHashProvider from '../providers/HashProvider/fakes/FakerHashProvider';
import CreateUserService from './CreateUserService';

let fakerUserRepository: FakerUsersRepository;
let fakerHashProvider: FakerHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakerUserRepository = new FakerUsersRepository();
    fakerHashProvider = new FakerHashProvider();
    createUserService = new CreateUserService(fakerUserRepository, fakerHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})