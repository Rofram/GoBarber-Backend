import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) { }

  public async execute({user_id, name, email, oldPassword, newPassword}: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    
    if (!user) {
      throw new AppError('user not found', 401);
    }

    const isEmailNotAvailable = await this.usersRepository.findByEmail(email);

    if (isEmailNotAvailable && user_id !== isEmailNotAvailable.id) {
      throw new AppError('E-mail already in use', 400);
    }

    Object.assign(user, {
      name, 
      email
    });

    if (!oldPassword && newPassword) {
      throw new AppError('Old password is required', 400);
    }

    if (oldPassword) {
      const hash = await this.hashProvider.generateHash(oldPassword);
      const isPasswordValid = this.hashProvider.compareHash(user.password, hash);

      if (!isPasswordValid) {
        throw new AppError('Old password is incorrect', 401);
      }
      
      if (newPassword) {
        user.password = await this.hashProvider.generateHash(newPassword);
      } else {
        throw new AppError('New password is required', 400);
      }
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService