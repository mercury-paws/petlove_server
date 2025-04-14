// import { sortByConstants, sortOrderConstants } from '../constants/constants.js';
import {validatePetData} from '../utils/validatePetData.js';

// export const getContacts = async ({
//   page,
//   perPage,
//   sortBy = sortByConstants[0],
//   sortOrder = sortOrderConstants[0],
//   filter,
// }) => {
//   const skip = (page - 1) * perPage;

//   const databaseQuery = Contact.find();

//   if (filter.userId) {
//     databaseQuery.where('userId').equals(filter.userId);
//   }
//   if (filter.type) {
//     databaseQuery.where('contactType').equals(filter.type);
//   }

//   if (filter.isFavourite) {
//     databaseQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   const items = await databaseQuery
//     .skip(skip)
//     .limit(perPage)
//     .sort({ [sortBy]: sortOrder });

//   const totalItems = await Contact.find().merge(databaseQuery).countDocuments();

//   const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData(
//     totalItems,
//     page,
//     perPage,
//   );

//   return {
//     items,
//     page,
//     perPage,
//     totalItems,
//     totalPages,
//     hasPreviousPage,
//     hasNextPage,
//   };
// };

// export const getContactById = (filter) => Contact.findOne(filter);

// export const addContact = (data) => Contact.create(data);

// export const upsertContact = async (filter, data, photo, options = {}) => {
//   if (photo) {
//     data.photo = photo;
//   }
//   const result = await Contact.findOneAndUpdate(filter, data, {
//     new: true,
//     runValidators: true,
//     includeResultMetadata: true,
//     ...options,
//   });

//   if (!result || !result.value) return null;

//   return {
//     result,
//     isNew: Boolean(result?.lastErrorObject?.upserted),
//   };
// };

// export const deleteContact = (filter) => Contact.findOneAndDelete(filter);

import Pet from '../db/models/Pet.js';

export const getAllPets = async () => await Pet.findAll();

export const getPetById = async (id) => await Pet.findByPk(id);

export const createPet = async (data) => {
  const validatedData = validatePetData(data);
  const newPet = await Pet.create(validatedData);
  return newPet;
};

export const updatePet = async (filter, data) => {
  const pet = await Pet.findOne({ where: filter });
  if (!pet) {
    throw new Error('Not found');
  };
  
  const validatedData = validatePetData(data);
  await pet.update(validatedData);
  return pet;
};

export const deletePet = async (id) => await Pet.destroy({ where: {id} });