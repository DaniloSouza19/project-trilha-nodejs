import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import 'reflect-metadata';

import './shared/container';
import { router } from './routes';
import swaggerDocument from './swagger.json';
import './database';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }
    console.log(error);

    return response.status(500).json({
      message: 'internal server Error',
    });
  }
);

app.listen(3333, () => {
  console.log('server is running on port 3333');
});
