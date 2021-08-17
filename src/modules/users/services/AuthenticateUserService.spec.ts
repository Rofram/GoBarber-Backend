import AppError from '@shared/errors/AppError';
import FakerHashProvider from '../providers/HashProvider/fakes/FakerHashProvider';
import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakerHashProvider: FakerHashProvider;
let fakerUsersRepository: FakerUsersRepository;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakerHashProvider = new FakerHashProvider();
    fakerUsersRepository = new FakerUsersRepository();
    authenticateUserService = new AuthenticateUserService(fakerUsersRepository, fakerHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await fakerUsersRepository.create({
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
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakerUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})