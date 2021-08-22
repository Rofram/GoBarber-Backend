import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/', 
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
	    name: Joi.string().required(),
	    oldPassword: Joi.string(),
	    newPassword: Joi.string(),
	    password_confirmation: Joi.string().valid(Joi.ref('newPassword')),
    }
  }),
  profileController.update
);


export default profileRouter;
