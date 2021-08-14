import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import User from '@modules/users/infra/typeorm/entities/User';

type UserPreview = Partial<User>

export default class UsersController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user: UserPreview = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    })

    delete user.password;

    return res.status(200).json(user);
  }
}