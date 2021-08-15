import AppError from '@shared/errors/AppError';
import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakerHashProvider from '../providers/HashProvider/fakes/FakerHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakerUserRepository = new FakerUsersRepository();
    const fakerHashProvider = new FakerHashProvider();
    const createUserService = new CreateUserService(fakerUserRepository, fakerHashProvider);

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakerUserRepository = new FakerUsersRepository();
    const fakerHashProvider = new FakerHashProvider();
    const createUserService = new CreateUserService(fakerUserRepository, fakerHashProvider);

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})