import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import logRequest from '@shared/utils/logRequest';
import UploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

// Rate limiter
app.use(rateLimiter);

// CORS
app.use(cors());

// Log request
// app.use(logRequest);

app.use(express.json());
app.use('/files', express.static(UploadConfig.uploadsFolder))
app.use(routes);

app.use(errors());

app.use((
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ 
        status: "Error",
        message: err.message 
      });
    }

    console.error(err);

    return res.status(500).json({
      status: "Error",
      message: "Internal Server Error"
    })
})

app.listen(3333,() => {
  console.log('🚀 server started on port 3333!')
});
