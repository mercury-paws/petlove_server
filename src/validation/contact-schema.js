import Joi from 'joi';
import {
  typeList,
  emailRegexp,
  phoneNumberRegexp,
} from '../constants/contacts-constants.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().pattern(phoneNumberRegexp).required().messages({
    'string.base': 'Email should be of the following format: xxx-xxx-xxxx',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': 'Email should be of the following format: name@example.com',
  }),
  contactType: Joi.string()
    .valid(...typeList)
    .required()
    .messages({
      'string.base':
        'type can be only the following: "work", "home", "personal"',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string().pattern(phoneNumberRegexp),
  email: Joi.string().pattern(emailRegexp),
  contactType: Joi.string().valid(...typeList),
});
