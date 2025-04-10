// import User from '../db/models/User.js';
import { hashValue } from '../utils/hash.js';

export const findUser = (filter) => User.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);

  return User.create({ ...data, password: hashPassword });
};

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const updatePassword = async (filter, data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);
  return User.findOneAndUpdate(filter, { password: hashPassword });
};
// export const resetEmail = (filter, data) => User.findOneAndUpdate(filter, data);

//graphql
import User from '../db/models/User.js';

const getAllUsers = async () => await User.findAll();
const getUserById = async (id) => await User.findByPk(id);
const createUser = async ({ name, email }) => await User.create({ name, email });

module.exports = { getAllUsers, getUserById, createUser };
