import Contact from '../db/models/Contacts.js';

export const getContacts = () => Contact.find();

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
