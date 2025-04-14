import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import cookieParser from 'cookie-parser';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { PUBLIC_DIR } from './constants/path.js';
import { graphqlHTTP } from 'express-graphql';

const PORT = Number(env('PORT', '3000'));
export default async function setupServer() {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(cors());
  app.use(logger);
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static(PUBLIC_DIR));

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  const { default: schema } = await import('./schemas/Schema.js');

  app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  }));

 

  app.use(notFoundHandler);
  app.use(errorHandler);

  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
