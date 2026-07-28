import type { Request, Response } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import { connectToDatabase } from '../config/database.js';
import { fallbackActivities, fallbackLeaderboard, fallbackTeams, fallbackUsers, fallbackWorkouts } from '../data/fallback.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

async function resolveCollection<T>(
  operation: () => Promise<T[] | null | undefined>,
  fallback: T[],
  res: Response,
): Promise<void> {
  try {
    await connectToDatabase();
    const data = await operation();
    res.json(Array.isArray(data) ? data : []);
  } catch (error) {
    console.warn('Falling back to static dataset.', error);
    res.json(fallback);
  }
}

export async function getHealth(_req: Request, res: Response): Promise<void> {
  try {
    await connectToDatabase();
    res.json({ status: 'ok', database: 'connected' });
  } catch (_error) {
    res.status(500).json({ status: 'error', message: 'Unable to connect to the database' });
  }
}

export function getSummary(_req: Request, res: Response): void {
  res.json({
    app: 'OctoFit Tracker',
    features: ['activity logging', 'team challenges', 'leaderboards'],
  });
}

export async function getUsers(_req: Request, res: Response): Promise<void> {
  await resolveCollection(async () => User.find({}).lean(), fallbackUsers, res);
}

export async function getTeams(_req: Request, res: Response): Promise<void> {
  await resolveCollection(async () => Team.find({}).lean(), fallbackTeams, res);
}

export async function getActivities(_req: Request, res: Response): Promise<void> {
  await resolveCollection(async () => Activity.find({}).lean(), fallbackActivities, res);
}

export async function getLeaderboard(_req: Request, res: Response): Promise<void> {
  await resolveCollection(async () => Leaderboard.find({}).sort({ rank: 1 }).lean(), fallbackLeaderboard, res);
}

export async function getWorkouts(_req: Request, res: Response): Promise<void> {
  await resolveCollection(async () => Workout.find({}).lean(), fallbackWorkouts, res);
}

export function getConfig(_req: Request, res: Response): void {
  const baseUrl = getApiBaseUrl(process.env.CODESPACE_NAME, 8000);
  res.json({ baseUrl });
}
