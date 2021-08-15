import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) { }

  public async execute({user_id, avatarFilename}: Request): Promise<User> {

    const user = await this.usersRepository.findById(user_id);
    
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    // delete previous avatar
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    // save new avatar
    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService