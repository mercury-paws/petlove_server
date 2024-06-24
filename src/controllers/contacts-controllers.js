import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  addContact,
  upsertContact,
  deleteContact,
} from '../services/contact-services.js';

export const getAllContactsController = async (req, res, next) => {
  const data = await getContacts();
  res.json({
    status: 200,
    data,
    message: 'Successfully found contacts',
  });
};

export const getContactByIdController = async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  const data = await getContactById(id);
  if (!data) {
    throw createHttpError(404, `Contact with id ${id} not found`);
  }
  res.json({
    status: 200,
    data,
    message: `Successfully found contact with id ${id}`,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const data = await upsertContact({ _id: id }, req.body);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    data,
    message: 'Successfully patched a contact!',
  });
};

export const deleteController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContact({ _id: id });
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204);
};
