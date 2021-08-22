import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';


export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const user = await container.resolve(
      ShowProfileService
    ).execute({ user_id });

    return res.json(classToClass(user));

  }


  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, oldPassword, newPassword } = req.body;
    const user_id = req.user.id;
  
    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      oldPassword,
      newPassword
    })

    return res.json(classToClass(user));
  }
}