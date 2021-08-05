import { Router } from 'express';

import User from '../models/User';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

interface SessionPreview {
  user: Partial<User>;
  token: string;
}

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token }: SessionPreview = await authenticateUser.execute({
    email,
    password
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
