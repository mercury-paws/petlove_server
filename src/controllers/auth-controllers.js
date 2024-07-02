import createHttpError from 'http-errors';
import { signup, findUser } from '../services/auth-services.js';
import { userSignupSchema } from '../validation/user-schema.js';
import { compareHash } from '../utils/hash.js';

export const signupController = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const newUser = await signup(req.body);
  console.log(req.body);
  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const signinController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(404, 'Email not found');
  }
  const passwordCompare = await compareHash(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Password is invalid');
  }

  const accessToken = '123.123.123';
  const refreshToken = '456.456.456';

  return {
    accessToken,
    refreshToken,
  };
};
