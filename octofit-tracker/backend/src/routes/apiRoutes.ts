import { Router } from 'express';
import {
  getActivities,
  getConfig,
  getHealth,
  getLeaderboard,
  getSummary,
  getTeams,
  getUsers,
  getWorkouts,
} from '../controllers/resourceController.js';

export const router = Router();

router.get('/health', getHealth);
router.get('/summary', getSummary);
router.get('/users/', getUsers);
router.get('/teams/', getTeams);
router.get('/activities/', getActivities);
router.get('/leaderboard/', getLeaderboard);
router.get('/workouts/', getWorkouts);
router.get('/config', getConfig);
