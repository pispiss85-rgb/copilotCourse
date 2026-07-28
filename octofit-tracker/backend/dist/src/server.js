import express from 'express';
import { getApiBaseUrl } from './config/api.js';
import { connectToDatabase } from './config/database.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';
const app = express();
const port = Number(process.env.PORT ?? 8000);
app.use(express.json());
app.get('/api/health', async (_req, res) => {
    try {
        await connectToDatabase();
        res.json({ status: 'ok', database: 'connected' });
    }
    catch (_error) {
        res.status(500).json({ status: 'error', message: 'Unable to connect to the database' });
    }
});
app.get('/api/summary', (_req, res) => {
    res.json({
        app: 'OctoFit Tracker',
        features: ['activity logging', 'team challenges', 'leaderboards'],
    });
});
app.get('/api/users/', async (_req, res) => {
    try {
        await connectToDatabase();
        const users = await User.find({}).lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load users', details: error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        await connectToDatabase();
        const teams = await Team.find({}).lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load teams', details: error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        await connectToDatabase();
        const activities = await Activity.find({}).lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load activities', details: error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        await connectToDatabase();
        const leaderboard = await Leaderboard.find({}).sort({ rank: 1 }).lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load leaderboard', details: error });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        await connectToDatabase();
        const workouts = await Workout.find({}).lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to load workouts', details: error });
    }
});
app.get('/api/config', (_req, res) => {
    res.json({ baseUrl: getApiBaseUrl(process.env.CODESPACE_NAME) });
});
app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl(process.env.CODESPACE_NAME)}`);
});
