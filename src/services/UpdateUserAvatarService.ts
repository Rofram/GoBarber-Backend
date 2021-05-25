import path from 'path';
import fs from 'fs'
import { getRepository } from 'typeorm';

import User from '../models/User';

import UploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
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
    userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService