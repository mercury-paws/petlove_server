import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts-controllers.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';

const contactsRouter = Router();
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

export default contactsRouter;
