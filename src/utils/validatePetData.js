import { validCategories, validSex, validSpecies } from '../constants/pet-constants.js';


export const validatePetData = (data) => {

    if (!validCategories.includes(data.category)) {
        throw new Error('Invalid category', 400);
    }

    if (!validSex.includes(data.sex)) {
        throw new Error('Invalid sex', 400);
    }

    if (!validSpecies.includes(data.species)) {
        throw new Error('Invalid species', 400);
    }
    return data;
};