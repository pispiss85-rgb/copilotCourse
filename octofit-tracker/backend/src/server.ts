import express from 'express';
import { connectToDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await connectToDatabase();
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Unable to connect to the database' });
  }
});

app.get('/api/summary', (_req, res) => {
  res.json({
    app: 'OctoFit Tracker',
    features: ['activity logging', 'team challenges', 'leaderboards'],
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});
