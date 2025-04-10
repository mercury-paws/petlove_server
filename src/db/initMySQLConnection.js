import { Sequelize } from 'sequelize';
import { env } from '../utils/env.js';

let sequelize;

const initMySQLConnection = async () => {
  try {
    const user = env('DB_USER');
    const password = env('DB_PASS');
    const name = env('DB_NAME');
    const host = env('DB_HOST');

      sequelize = new Sequelize(name, user, password, {
      host: host,
      dialect: 'mysql',
      logging: false, // optional
    });

    await sequelize.authenticate();
    console.log('✅ MySQL connection successfully established!');
  } catch (error) {
    console.log(`Error connecting to database ${error}`);
    throw error;
  }
};

export { initMySQLConnection, sequelize };
