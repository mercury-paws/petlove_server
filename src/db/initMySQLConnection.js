import { Sequelize } from 'sequelize';
import { env } from '../utils/env.js';

let sequelize;

const initMySQLConnection = async () => {

  if (!sequelize) {
    sequelize = new Sequelize({

      dialect: 'mysql',
      logging: false,
      username: env('DB_USER'),
      password: env('DB_PASS'),
      database: env('DB_NAME'),
      host: env('DB_HOST'),
    });

    try {
      await sequelize.authenticate();
      console.log('✅ MySQL connection successfully established!', 'DB name:', process.env.DB_NAME);
    } catch (error) {
      console.log(`Error connecting to database ${error}`);
      throw error;
    }
  };
};


export { initMySQLConnection, sequelize  };
