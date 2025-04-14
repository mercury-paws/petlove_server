import {initMySQLConnection} from './db/initMySQLConnection.js';
import setupServer from './server.js';
// import { setUpAssociations } from './db/models/associations.js';
// import createDirIfNotExists from './utils/createDirIfNotExists.js';
// import { TEMP_UPLOAD_DIR, PUBLIC_DIR, PHOTO_DIR } from './constants/path.js';


const bootstrap = async () => {
  try {
    await initMySQLConnection();
 
    await setupServer();
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
};

bootstrap();
