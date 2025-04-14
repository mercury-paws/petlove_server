import { DataTypes } from 'sequelize';
import { sequelize } from '../initMySQLConnection.js';
import { mySQLSaveError, setUpdateSettings } from './hooks.js';

// const sequelize = getSequelize();

const Pet = sequelize.define('Pets', {
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
  title: {
      type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
        len: {
        args: [3, 20],
        msg: 'Must be between 3 and 20 characters',
      },
    },
  },
  category: {
      type: DataTypes.ENUM("Sell", "Free", "Lost", "Found"),
        allowNull: false,
        validate: {
        len: {
        msg: 'Must be either "Sell", "Free", "Lost", "Found"',
      },
    },
  },
  sex: {
      type: DataTypes.ENUM("Unknown", "Female", "Male"),
        allowNull: false,
        validate: {
        len: {
        msg: 'Must be either "Unknown", "Female", "Male"',
      },
    },
  },
  species: {
      type: DataTypes.ENUM("Dog", "Cat", "Monkey", "Bird", "Snake", "Turtle"),
        allowNull: false,
        validate: {
        len: {
        msg: 'Must be either "Dog", "Cat", "Monkey", "Bird", "Snake", "Turtle"',
      },
    },
  },
  about: {
      type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
        len: {
        args: [3, 70],
        msg: 'Must be between 3 and 70 characters',
      },
    },
  },
  birthday: {
      type: DataTypes.DATE,
        allowNull: false,
    validate: { 
        isDate: { msg: 'Must be a valid date' },
      },
    },
starNumber: {
      type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        len: {
        args: [3, 70],
        msg: 'Must be between 3 and 70 characters',
      },
    },
  },
  price: {
      type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
        min: 0,
      },
    },
 
    isFavourite: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    userId: {
       type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: 'Users',  
      key: 'id',   
    },
    },
  },
  {
    timestamps: true,
    updatedAt: 'updatedAt',
  createdAt: 'createdAt',
  tableName: 'Pets',
  },
);

Pet.addHook('afterCreate', mySQLSaveError);
Pet.addHook('beforeUpdate', setUpdateSettings);


  
export default Pet;
