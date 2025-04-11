// import User from '../db/models/User.js';
// import { hashValue } from '../utils/hash.js';

// export const findUser = (filter) => User.findOne(filter);

// export const signup = async (data) => {
//   const { password } = data;
//   const hashPassword = await hashValue(password);

//   return User.create({ ...data, password: hashPassword });
// };

// export const updatePassword = async (filter, data) => {
//   const { password } = data;
//   const hashPassword = await hashValue(password);
//   return User.findOneAndUpdate(filter, { password: hashPassword });
// };
// export const resetEmail = (filter, data) => User.findOneAndUpdate(filter, data);

//graphql
import User from '../db/models/User.js';

export const getAllUsers = async () => await User.findAll();

export const getUserById = async (id) => await User.findByPk(id);

export const createUser = async (data) => await User.create(data);

export const updateUser = async (filter, data) => {
  const user = await User.findOne({ where: filter });
  if (!user) {
    throw new Error('Not found');
  }
  await user.update(data);
  return user;
};

export const deleteUser = async (id) => await User.destroy({ where:  id });

