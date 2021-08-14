import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

import User from '@modules/users/infra/typeorm/entities/User';

type UserPreview = Partial<User>

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
  
    const createUser = container.resolve(CreateUserService);

    const user: UserPreview = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password;

    return res.json(user);
  }
}