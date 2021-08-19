import FakerUsersRepository from '@modules/users/repositories/fakes/FakerUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakerUsersRepository;
let ListProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakerUsersRepository();
    ListProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to show a list of providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'John Doe',
      name: 'johndoe@example.com',
      password: '123456',
    })

    const user2 = await fakeUsersRepository.create({
      email: 'John Trê',
      name: 'johntre@example.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      email: 'John Qua',
      name: 'johnqua@example.com',
      password: '123456',
    })

    const providers = await ListProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([
      user1,
      user2
    ]);
  });
})