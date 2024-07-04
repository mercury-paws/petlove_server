import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  addContact,
  upsertContact,
  deleteContact,
} from '../services/contact-services.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactsFilterParams from '../utils/parseContactsFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { type, isFavourite } = parseContactsFilterParams(req.query);
  const { _id: userId } = req.user;

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
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
    message: `Successfully found contact with id ${id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await addContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const putContactController = async (req, res) => {
  const { id } = req.params;
  const data = await upsertContact({ _id: id }, req.body, { upsert: true });
  const status = data.isNew ? 201 : 200;
  const message = data.isNew ? 'Successfully added Contact' : 'Contact updated';
  res.json({
    status,
    message,
    data: data.value,
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
    message: 'Successfully patched a contact!',
    data: data.result.value,
  });
};

export const deleteController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContact({ _id: id });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).end();
};
