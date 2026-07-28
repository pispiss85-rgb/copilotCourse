import { getApiBaseUrl } from '../config/api.js';
import { connectToDatabase } from '../config/database.js';
import { fallbackActivities, fallbackLeaderboard, fallbackTeams, fallbackUsers, fallbackWorkouts } from '../data/fallback.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';
async function resolveCollection(operation, fallback, res) {
    try {
        await connectToDatabase();
        const data = await operation();
        const resolvedData = Array.isArray(data) ? data : [];
        res.json(resolvedData.length > 0 ? resolvedData : fallback);
    }
    catch (error) {
        console.warn('Falling back to static dataset.', error);
        res.json(fallback);
    }
}
export async function getHealth(_req, res) {
    try {
        await connectToDatabase();
        res.json({ status: 'ok', database: 'connected' });
    }
    catch (_error) {
        res.status(500).json({ status: 'error', message: 'Unable to connect to the database' });
    }
}
export function getSummary(_req, res) {
    res.json({
        app: 'OctoFit Tracker',
        features: ['activity logging', 'team challenges', 'leaderboards'],
    });
}
export async function getUsers(_req, res) {
    await resolveCollection(async () => User.find({}).lean(), fallbackUsers, res);
}
export async function getTeams(_req, res) {
    await resolveCollection(async () => Team.find({}).lean(), fallbackTeams, res);
}
export async function getActivities(_req, res) {
    await resolveCollection(async () => Activity.find({}).lean(), fallbackActivities, res);
}
export async function getLeaderboard(_req, res) {
    await resolveCollection(async () => Leaderboard.find({}).sort({ rank: 1 }).lean(), fallbackLeaderboard, res);
}
export async function getWorkouts(_req, res) {
    await resolveCollection(async () => Workout.find({}).lean(), fallbackWorkouts, res);
}
export function getConfig(_req, res) {
    const baseUrl = getApiBaseUrl(process.env.CODESPACE_NAME, 8000);
    res.json({ baseUrl });
}
