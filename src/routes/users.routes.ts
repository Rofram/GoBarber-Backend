import { Router } from 'express';
import multer from 'multer';
import uploadsConfig from '../config/upload';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadsConfig);

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

usersRouter.patch('/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'), 
  async ( req, res ) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user: UserPreview = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      })

      delete user.password;

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
});

export default usersRouter;
