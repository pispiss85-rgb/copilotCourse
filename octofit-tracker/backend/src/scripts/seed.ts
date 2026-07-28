import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';

async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Connected to octofit_db');

    const seedData = {
      users: [
        { name: 'Mina', role: 'student', points: 120 },
        { name: 'Jules', role: 'student', points: 95 },
      ],
      teams: [{ name: 'Blue Falcons', members: 2 }],
      activities: [{ type: 'run', durationMinutes: 25, points: 30 }],
    };

    console.log('Seed data prepared:', JSON.stringify(seedData));
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectFromDatabase();
  }
}

seedDatabase();
