import AppError from '@shared/errors/AppError';
import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatarService', () => {
  it('should be able to update user avatar', async () => {
    const fakeUserRepository = new FakerUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    const user = await fakeUserRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUserRepository = new FakerUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    expect(
      updateUserAvatarService.execute({
        user_id: 'non-exist-user',
        avatarFilename: 'avatar.png',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  
  it('should be delete old user avatar when new one', async () => {
    const fakeUserRepository = new FakerUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    const user = await fakeUserRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
})