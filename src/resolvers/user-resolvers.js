// import createHttpError from 'http-errors';
// import {
//   signup,
//   findUser,
//   updateUser,
//   updatePassword,
// } from '../services/auth-services.js';
// import { compareHash } from '../utils/hash.js';
// import {
//   createSession,
//   findSession,
//   deleteSession,
// } from '../services/session-services.js';
// // import sendEmailtoConfirm from '../utils/sendEmailToConfirm.js';
// import sendEmailtoReset from '../utils/sendEmail.js';
// import { env } from '../utils/env.js';
// import jwt from 'jsonwebtoken';
// import { TEMPLATES_DIR } from '../constants/path.js';
// import fs from 'node:fs/promises';
// import handlebars from 'handlebars';
// import path from 'node:path';

// const app_domain = env('APP_DOMAIN', 'http://localhost:3000');
// const jwt_secret = env('JWT_SECRET');
// // const verifyEmailPath = path.join(TEMPLATES_DIR, 'verify-email.html');
// const resetEmailPath = path.join(TEMPLATES_DIR, 'reset-password-email.html');

// const setupResponseSession = (
//   res,
//   { refreshToken, refreshTokenValidUntil, _id },
// ) => {
//   res.cookie('refreshToken', refreshToken, {
//     httpOnly: true,
//     expires: refreshTokenValidUntil,
//   });

//   res.cookie('sessionId', _id, {
//     httpOnly: true,
//     expires: refreshTokenValidUntil,
//   });
// };

// export const signupController = async (req, res) => {
//   const { email } = req.body;
//   const user = await findUser({ email });
//   if (user) {
//     throw createHttpError(409, 'Email in use');
//   }
//   const newUser = await signup(req.body);
//   console.log(req.body);

//   // const payload = {
//   //   id: newUser._id,
//   //   email,
//   // };

//   // const token = jwt.sign(payload, jwt_secret);
//   // const emailTemplateSource = await fs.readFile(verifyEmailPath, 'utf-8');
//   // const emailTemplate = handlebars.compile(emailTemplateSource);

//   // const html = emailTemplate({
//   //   user_name: newUser.name,
//   //   app_domain,
//   //   token,
//   // });

//   // const verifyEmail = {
//   //   subject: 'Verify Email',
//   //   to: email,
//   //   html,
//   //`<a target="_blank" href="${app_domain}/auth/verify?token=${token}">Click to verify your email</a>`,
//   // };

//   // await sendEmailtoConfirm(verifyEmail);

//   const data = {
//     name: newUser.name,
//     email: newUser.email,
//   };

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully registered a user!',
//     data,
//   });
// };

// export const verifyController = async (req, res) => {
//   const { token } = req.query;
//   try {
//     const { id, email } = jwt.verify(token, jwt_secret);
//     const user = await findUser({ _id: id, email });
//     if (!user) {
//       throw createHttpError(404, 'User not found');
//     }
//     await updateUser({ email }, { verify: true });

//     res.json({
//       status: 200,
//       message: 'Email verified successfully',
//     });
//   } catch (error) {
//     throw createHttpError(401, error.message);
//   }
// };

// export const signinController = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   const user = await findUser({ email });

//   if (!user) {
//     throw createHttpError(404, 'Email not found');
//   }

//   // if (!user.verify) {
//   //   throw createHttpError(401, 'Email not verified');
//   // }

//   const passwordCompare = await compareHash(password, user.password);
//   if (!passwordCompare) {
//     throw createHttpError(401, 'Password is invalid');
//   }
//   const session = await createSession(user._id);

//   setupResponseSession(res, session);

//   res.json({
//     status: 200,
//     message: 'Successfully logged in an user!',
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };

// export const refreshController = async (req, res) => {
//   const { refreshToken, sessionId } = req.cookies;
//   const currentSession = await findSession({ refreshToken, _id: sessionId });
//   if (!currentSession) {
//     throw createHttpError(401, 'Session not found');
//   }
//   const refreshTokenExpired =
//     new Date() > new Date(currentSession.refreshTokenValidUntil);

//   if (refreshTokenExpired) {
//     throw createHttpError(401, 'Session expired');
//   }

//   const newSession = await createSession(currentSession.userId);

//   setupResponseSession(res, newSession);

//   res.json({
//     status: 200,
//     message: 'Successfully refreshed a session!',
//     data: {
//       accessToken: newSession.accessToken,
//     },
//   });
// };

// export const signoutController = async (req, res) => {
//   const { sessionId } = req.cookies;
//   if (!sessionId) {
//     throw createHttpError(401, 'Session not found');
//   }
//   await deleteSession({ _id: sessionId });

//   res.clearCookie('sessionId');
//   res.clearCookie('refreshToken');

//   res.status(204).send();
// };

// export const requestResetEmailController = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await findUser({ email });
//     if (!user) {
//       throw createHttpError(404, 'User not found');
//     }
//     const payload = {
//       id: user._id,
//       email,
//     };

//     const resetToken = jwt.sign(payload, jwt_secret, {
//       expiresIn: '5m',
//     });

//     const emailTemplateSource = await fs.readFile(resetEmailPath, 'utf-8');
//     const emailTemplate = handlebars.compile(emailTemplateSource);

//     const html = emailTemplate({
//       user_name: user.name,
//       app_domain,
//       resetToken,
//     });

//     const resetEmail = {
//       subject: 'Reset your password',
//       to: email,
//       html,
//       //`<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
//     };

//     await sendEmailtoReset(resetEmail);

//     res.json({
//       message: 'Reset password email was successfully sent!',
//       status: 200,
//       data: {},
//     });
//   } catch (error) {
//     console.error('Failed to send the email:', error);
//     throw createHttpError(
//       500,
//       'Failed to send the email, please try again later.',
//     );
//   }
// };

// export const verifyResetPasswordController = async (req, res) => {
//   const { token, password } = req.body;

//   try {
//     const verifiedTokenq = jwt.verify(token, jwt_secret);
//     const { id, email } = verifiedTokenq;
//     const user = await findUser({ _id: id, email });
//     if (!user) {
//       throw createHttpError(404, 'User not found');
//     }
//     if (!token || !verifiedTokenq) {
//       throw createHttpError(401, 'Token is expired or invalid.');
//     }

//     const passwordCompare = await compareHash(password, user.password);
//     if (passwordCompare) {
//       throw createHttpError(401, 'Password is in use');
//     }
//     await updatePassword({ _id: id }, { password: password });

//     res.json({
//       status: 200,
//       message: 'Password has been successfully reset.',
//       data: {},
//     });
//   } catch (error) {
//     throw createHttpError(401, error.message);
//   }
// };
