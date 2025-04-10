import { DataTypes } from 'sequelize';
import { sequelize } from '../initMySQLConnection';
import { mySQLSaveError, setUpdateSettings } from './hooks';
import User from './User';

const Session = sequelize.define('Session', {
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE', // If the user is deleted, delete all associated sessions
  },
    accessToken: {
      type: DataTypes.STRING,
    allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
    allowNull: false,
    },
    accessTokenValidUntil: {
      type: DataTypes.DATE,
    allowNull: false,
    },
    refreshTokenValidUntil: {
      type: DataTypes.DATE,
    allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    tableName: 'Sessions',
  },
);

Session.addHook('afterCreate', mySQLSaveError);
Session.addHook('beforeUpdate', setUpdateSettings);

Session.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',  // Alias to access user from session
});

export default Session;
