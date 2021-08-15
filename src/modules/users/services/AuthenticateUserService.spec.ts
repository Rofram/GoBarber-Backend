import AppError from '@shared/errors/AppError';
import FakerHashProvider from '../providers/HashProvider/fakes/FakerHashProvider';
import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const fakerUsersRepository = new FakerUsersRepository();
    const fakerHashProvider = new FakerHashProvider();
    const authenticateUserService = new AuthenticateUserService(fakerUsersRepository, fakerHashProvider);
    const createUserService = new CreateUserService(fakerUsersRepository, fakerHashProvider);

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakerUsersRepository = new FakerUsersRepository();
    const fakerHashProvider = new FakerHashProvider();
    const authenticateUserService = new AuthenticateUserService(fakerUsersRepository, fakerHashProvider);

    expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakerUsersRepository = new FakerUsersRepository();
    const fakerHashProvider = new FakerHashProvider();
    const authenticateUserService = new AuthenticateUserService(fakerUsersRepository, fakerHashProvider);
    const createUserService = new CreateUserService(fakerUsersRepository, fakerHashProvider);

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})