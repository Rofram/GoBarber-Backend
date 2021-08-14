import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import User from '@modules/users/infra/typeorm/entities/User';

interface SessionPreview {
  user: Partial<User>;
  token: string;
}

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
  
    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token }: SessionPreview = await authenticateUser.execute({
      email,
      password
    });

    delete user.password;

    return res.json({ user, token });
  }
}