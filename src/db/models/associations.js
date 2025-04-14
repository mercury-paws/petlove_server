import User from "./User.js";
import Pet from "./Pet.js";


export const setUpAssociations = async () => {
  User.hasMany(Pet, {
    foreignKey: 'userId',
    as: 'pets',
  });

  Pet.belongsTo(User, {
    foreignKey: 'userId',
    as: 'users',
  });
};
