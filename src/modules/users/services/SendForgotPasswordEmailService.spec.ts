import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakerUserRepository: FakeUsersRepository;
let fakerUserTokensRepository: FakeUserTokensRepository;
let fakerMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakerUserRepository = new FakeUsersRepository();
    fakerUserTokensRepository = new FakeUserTokensRepository();
    fakerMailProvider = new FakeMailProvider();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakerUserRepository,
      fakerMailProvider,
      fakerUserTokensRepository
    );
  });

  it('should be able to recover the password using the email', async () => {
    
    const sendMail = jest.spyOn(fakerMailProvider, 'sendMail');

    const user = await fakerUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });

    await sendForgotPasswordEmailService.execute({
      email: user.email,
    });

    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the email is not found', async () => {
    const sendMail = jest.spyOn(fakerMailProvider, 'sendMail');

    expect(
      sendForgotPasswordEmailService.execute({
        email: 'wrong-email'
      })
    ).rejects.toThrow(AppError);
    
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('should generate a forgot password token', async () => {
    const sendMail = jest.spyOn(fakerMailProvider, 'sendMail');
    const generateToken = jest.spyOn(fakerUserTokensRepository, 'generateToken');

    const user = await fakerUserRepository.create({
      name: 'John Doe',
      email:  'johndoe@email.com',
      password: '12345678',
    });

    await sendForgotPasswordEmailService.execute({
      email: user.email,
    });

    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
})