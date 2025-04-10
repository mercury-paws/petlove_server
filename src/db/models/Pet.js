import { DataTypes } from 'sequelize';
import { sequelize } from '../initMySQLConnection';
import { mySQLSaveError, setUpdateSettings } from './hooks';
import User from './User';


const Pet = sequelize.define('Pet', {
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
      type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
        len: {
        args: ["Sell", "Free", "Lost", "Found"],
        msg: 'Must be either "Sell", "Free", "Lost", "Found"',
      },
    },
  },
  sex: {
      type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
        len: {
        args: ["Unknown", "Female", "Male"],
        msg: 'Must be either "Unknown", "Female", "Male"',
      },
    },
  },
  species: {
      type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
        len: {
        args: ["Dog", "Cat", "Monkey", "Bird", "Snake", "Turtle"],
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
        len: {
        args: [3, 70],
        msg: 'Must be between 3 and 70 characters',
      },
    },
  },
starNumber: {
      type: DataTypes.NUMBER,
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
  tableName: 'Pet',
  },
);

Pet.addHook('afterCreate', mySQLSaveError);
Pet.addHook('beforeUpdate', setUpdateSettings);

Pet.belongsTo(User, {
  foreignKey: 'userId', 
  targetKey: 'id',
});

export default Pet;
