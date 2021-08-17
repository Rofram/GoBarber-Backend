import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokensRepository') private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute({ email }: Request): Promise<void> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generateToken(user.id);

    const forgotPasswordTemplate = path.join(__dirname, '../views/forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Reset Password',
      templateData: {
        file: forgotPasswordTemplate,
        vars: {
          name: user.name,
          token,
          link: `${process.env.APP_URL}/password/reset?token=${token}`
        }
      }
    });

    return;
  }
}

export default SendForgotPasswordEmailService;