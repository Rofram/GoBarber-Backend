import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakerHashProvider from '../providers/HashProvider/fakes/FakerHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakerUserRepository: FakeUsersRepository;
let fakerUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakerHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakerUserRepository = new FakeUsersRepository();
    fakerUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakerHashProvider();
    
    resetPasswordService = new ResetPasswordService(
      fakerUserRepository, 
      fakerUserTokensRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset the password', async () => {    

    const user = await fakerUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    const { token } = await fakerUserTokensRepository.generateToken(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    
    await resetPasswordService.execute({
      token,
      password: 'newpassword',
    });

    const updatedUser = await fakerUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('newpassword');
    expect(updatedUser?.password).toBe('newpassword');
  });

  it('should throw an error if the token is not found', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existent-token',
        password: 'newpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error if non-existing user', async () => {
    const { token } = await fakerUserTokensRepository.generateToken('non-existent-user');

    await expect(
      resetPasswordService.execute({
        token,
        password: 'newpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {    
    const user = await fakerUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    const { token } = await fakerUserTokensRepository.generateToken(user.id); 

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });
    
    await expect(
      resetPasswordService.execute({
        token,
        password: 'newpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})