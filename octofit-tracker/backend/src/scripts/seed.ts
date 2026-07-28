import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  try {
    await connectToDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Mina Chen', email: 'mina@example.com', role: 'student', points: 140, team: 'Blue Falcons' },
      { name: 'Jules Ortiz', email: 'jules@example.com', role: 'student', points: 118, team: 'Blue Falcons' },
      { name: 'Theo Brooks', email: 'theo@example.com', role: 'coach', points: 90, team: 'Red Hawks' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Blue Falcons', sport: 'Track', members: ['mina@example.com', 'jules@example.com'], score: 258 },
      { name: 'Red Hawks', sport: 'Basketball', members: ['theo@example.com'], score: 90 },
    ]);

    const activities = await Activity.insertMany([
      { userId: users[0]._id.toString(), type: 'run', durationMinutes: 25, points: 30 },
      { userId: users[1]._id.toString(), type: 'strength', durationMinutes: 35, points: 40 },
      { userId: users[2]._id.toString(), type: 'walk', durationMinutes: 20, points: 20 },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), name: 'Mina Chen', points: 140, rank: 1 },
      { userId: users[1]._id.toString(), name: 'Jules Ortiz', points: 118, rank: 2 },
      { userId: users[2]._id.toString(), name: 'Theo Brooks', points: 90, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'Morning Run', type: 'cardio', durationMinutes: 20, difficulty: 'easy', description: 'A brisk run to build endurance.' },
      { title: 'Strength Circuit', type: 'strength', durationMinutes: 30, difficulty: 'moderate', description: 'Bodyweight exercises for full-body strength.' },
      { title: 'Core Flow', type: 'mobility', durationMinutes: 15, difficulty: 'easy', description: 'Stretch and balance routine for recovery.' },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, and workout plans.`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectFromDatabase();
  }
}

void seedDatabase();
