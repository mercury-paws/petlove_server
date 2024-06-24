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

const contactsRouter = Router();
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post('/', ctrlWrapper(addContactController));
contactsRouter.patch('/:id', isValidId, ctrlWrapper(patchContactController));
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteController));
export default contactsRouter;
