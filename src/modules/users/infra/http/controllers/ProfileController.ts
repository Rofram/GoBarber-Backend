import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import User from '@modules/users/infra/typeorm/entities/User';

type UserPreview = Partial<User>

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const user: UserPreview = await container.resolve(
      ShowProfileService
    ).execute({ user_id });

    delete user.password;

    return res.json(user);

  }


  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, oldPassword, newPassword } = req.body;
    const user_id = req.user.id;
  
    const updateProfile = container.resolve(UpdateProfileService);

    const user: UserPreview = await updateProfile.execute({
      user_id,
      name,
      email,
      oldPassword,
      newPassword
    })

    delete user.password;

    return res.json(user);
  }
}