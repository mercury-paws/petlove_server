import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteController,
} from '../controllers/contacts-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contact-schema.js';

const contactsRouter = Router();
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);
contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteController));
export default contactsRouter;
