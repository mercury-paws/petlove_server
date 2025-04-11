import { DataTypes } from 'sequelize';
import { sequelize } from '../initMySQLConnection';
import { mySQLSaveError, setUpdateSettings } from './hooks';
import Pet from './Pet';

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20), 
    allowNull: false,
    validate: {
      len: {
        args: [3, 20],
        msg: 'Must be between 3 and 20 characters',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6],
        msg: 'Password must be at least 6 characters long',
      },
    },
  },
  verify: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
  tableName: 'Users',
});

User.addHook('afterCreate', mySQLSaveError);
User.addHook('beforeUpdate', setUpdateSettings);

User.hasMany(Pet, {
  foreignKey: 'userId',
  as: 'pets',
});


export default User;
