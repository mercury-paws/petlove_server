import Contact from '../db/models/Contacts.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const skip = (page - 1) * perPage;
  const items = await Contact.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await Contact.countDocuments();

  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData(
    totalItems,
    page,
    perPage,
  );

  return {
    items,
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

export const getContactById = (id) => Contact.findById(id);

export const addContact = (data) => Contact.create(data);

export const upsertContact = async (filter, data, options = {}) => {
  const result = await Contact.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return {
    result,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
