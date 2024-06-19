import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getContacts, getContactById } from './services/contact-services.js';

const PORT = Number(env('PORT', '3000'));

export default function setupServer() {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(cors());
  app.use(logger);

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get('/api/contacts', async (req, res) => {
    const data = await getContacts();
    res.json({
      status: 200,
      data,
      message: 'Successfully found contacts',
    });
  });

  app.get('/api/contacts/:id', async (req, res) => {
    console.log(req.params);
    try {
      const { id } = req.params;
      const data = await getContactById(id);

      if (!data) {
        return res.status(404).json({
          message: `Contact with id ${id} not found`,
        });
      }

      res.json({
        status: 200,
        data,
        message: `Successfully found contact with id ${id}`,
      });
    } catch (error) {
      if (error.message.includes('Cast to objectID failed')) {
        error.status(404);
      }

      const { status = 500 } = error;
      res.status(status).json({
        message: error.message,
      });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
    next();
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
    next();
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
