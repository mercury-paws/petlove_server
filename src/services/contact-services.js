import Contact from '../db/models/Contacts.js';

export const getContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);
