import express from 'express';
import { getApiBaseUrl } from './config/api.js';
import { router as apiRouter } from './routes/apiRoutes.js';

export const app = express();
const port = Number(process.env.PORT ?? 8000);
const baseUrl = getApiBaseUrl(process.env.CODESPACE_NAME, 8000);

app.use(express.json());
app.use('/api', apiRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
}
