import { Router } from 'express';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

type UserPreview = Partial<User>

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user: UserPreview = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
