import AppError from '@shared/errors/AppError';

import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakerUsersRepository;
let showProfileService: ShowProfileService;



describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakerUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe(user.name);
    expect(profile.email).toBe(user.email);
  });

  it('should not be able to show the profile if the user does not exist', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'wrong-user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})