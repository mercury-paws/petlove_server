import Joi from 'joi';
import {
  typeList,
  emailRegexp,
  phoneNumberRegexp,
} from '../constants/contacts-constants.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().pattern(phoneNumberRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string().pattern(phoneNumberRegexp),
  email: Joi.string().pattern(emailRegexp),
  contactType: Joi.string().valid(...typeList),
});
