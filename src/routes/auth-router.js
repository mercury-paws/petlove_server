import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  userSigninSchema,
  userSignupSchema,
} from '../validation/user-schema.js';
import { signupController } from '../controllers/auth-controllers.js';

const authRouter = Router();
authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

export default authRouter;
