import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import { notesRouter } from './routers/notes.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

export function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp());

  app.use('/notes', notesRouter);

  app.get('/test-error', (req, res, next) => {
    next(new Error('Test error'));
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
