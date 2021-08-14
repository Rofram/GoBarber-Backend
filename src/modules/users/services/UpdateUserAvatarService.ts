import path from 'path';
import fs from 'fs'
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

import UploadConfig from '@config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
    ) {}

  public async execute({user_id, avatarFilename}: Request): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // delete previous avatar
      const userAvatarFilepath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilepath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilepath);
      }
    }

    user.avatar = avatarFilename;
    this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService