import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  userSigninSchema,
  userSignupSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/user-schema.js';
import {
  signupController,
  signinController,
  refreshController,
  signoutController,
  verifyController,
  verifyResetPasswordController,
  requestResetEmailController,
} from '../controllers/auth-controllers.js';

const authRouter = Router();
authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(signoutController));
authRouter.get('/verify', ctrlWrapper(verifyController));

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(verifyResetPasswordController),
);

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

export default authRouter;
