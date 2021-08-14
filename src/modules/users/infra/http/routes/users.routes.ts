import { Router } from 'express';
import multer from 'multer';
import uploadsConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadsConfig);
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'), 
  userAvatarController.update
);

export default usersRouter;
