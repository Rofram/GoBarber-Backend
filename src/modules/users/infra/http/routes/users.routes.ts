import { Router } from 'express';
import multer from 'multer';
import uploadsConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadsConfig.multer);
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }
  }),
  usersController.create
);

usersRouter.patch('/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'), 
  userAvatarController.update
);

export default usersRouter;
