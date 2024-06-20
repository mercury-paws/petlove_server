import createHttpError from 'http-errors';
import { getContacts, getContactById } from '../services/contact-services.js';

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
