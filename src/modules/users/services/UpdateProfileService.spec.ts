import AppError from '@shared/errors/AppError';

import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakerHashProvider from '../providers/HashProvider/fakes/FakerHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakerUsersRepository;
let fakeHashProvider: FakerHashProvider;
let updateProfileService: UpdateProfileService;


describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakerUsersRepository();
    fakeHashProvider = new FakerHashProvider();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'new name',
      email: 'new@email.com'
    });

    expect(updatedUser.name).toBe('new name');
    expect(updatedUser.email).toBe('new@email.com');
  });

  it('should not be able to update the profile if e-mail is already taken', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: '123456789',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'new name',
        email: 'johndoe@email.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'test',
      email: 'test@test.com',
      oldPassword: 'test',
      newPassword: 'new password',
    });

    expect(updatedUser.password).toBe('new password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'test',
        email: 'test@test.com',
        newPassword: 'new password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without new password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'test',
        email: 'test@test.com',
        oldPassword: 'test',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'test',
        email: 'test@test.com',
        oldPassword: 'wrong-old-password',
        newPassword: 'new password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with user not found', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: 'test',
        email: 'test@test.com',
        oldPassword: 'wrong-old-password',
        newPassword: 'new password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})