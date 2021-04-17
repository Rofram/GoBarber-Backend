import express, { Request, Response } from 'express';
import routes from './routes';
import logRequest from './utils/logRequest';

const app = express();

app.use(express.json());

app.use(logRequest);

app.use(routes);

app.listen(3333, () => {
  console.log('🚀 server started on port 3333!')
});
