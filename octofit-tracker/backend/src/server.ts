import express from 'express';
import { getApiBaseUrl } from './config/api.js';
import { connectToDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await connectToDatabase();
    res.json({ status: 'ok', database: 'connected' });
  } catch (_error) {
    res.status(500).json({ status: 'error', message: 'Unable to connect to the database' });
  }
});

app.get('/api/summary', (_req, res) => {
  res.json({
    app: 'OctoFit Tracker',
    features: ['activity logging', 'team challenges', 'leaderboards'],
  });
});

app.get('/api/users/', (_req, res) => {
  res.json([
    { id: 'user-1', name: 'Mina', role: 'student' },
    { id: 'user-2', name: 'Jules', role: 'student' },
  ]);
});

app.get('/api/teams/', (_req, res) => {
  res.json([
    { id: 'team-1', name: 'Blue Falcons', members: 2 },
  ]);
});

app.get('/api/activities/', (_req, res) => {
  res.json([
    { id: 'activity-1', type: 'run', durationMinutes: 25, points: 30 },
  ]);
});

app.get('/api/leaderboard/', (_req, res) => {
  res.json([
    { id: 'user-1', name: 'Mina', points: 120 },
    { id: 'user-2', name: 'Jules', points: 95 },
  ]);
});

app.get('/api/workouts/', (_req, res) => {
  res.json([
    { id: 'workout-1', title: 'Morning Run', difficulty: 'easy' },
    { id: 'workout-2', title: 'Strength Circuit', difficulty: 'moderate' },
  ]);
});

app.get('/api/config', (_req, res) => {
  res.json({ baseUrl: getApiBaseUrl() });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
