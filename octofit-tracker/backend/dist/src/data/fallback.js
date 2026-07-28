export const fallbackUsers = [
    { _id: 'user-1', id: 'user-1', name: 'Mina Chen', email: 'mina@example.com', role: 'student', points: 140, team: 'Blue Falcons' },
    { _id: 'user-2', id: 'user-2', name: 'Jules Ortiz', email: 'jules@example.com', role: 'student', points: 118, team: 'Blue Falcons' },
    { _id: 'user-3', id: 'user-3', name: 'Theo Brooks', email: 'theo@example.com', role: 'coach', points: 90, team: 'Red Hawks' },
];
export const fallbackActivities = [
    { _id: 'activity-1', id: 'activity-1', userId: 'user-1', type: 'run', durationMinutes: 25, points: 30, completedAt: '2026-07-28T00:00:00.000Z' },
    { _id: 'activity-2', id: 'activity-2', userId: 'user-2', type: 'strength', durationMinutes: 35, points: 40, completedAt: '2026-07-28T00:10:00.000Z' },
    { _id: 'activity-3', id: 'activity-3', userId: 'user-3', type: 'walk', durationMinutes: 20, points: 20, completedAt: '2026-07-28T00:20:00.000Z' },
];
export const fallbackTeams = [
    { _id: 'team-1', id: 'team-1', name: 'Blue Falcons', sport: 'Track', members: ['mina@example.com', 'jules@example.com'], score: 258 },
    { _id: 'team-2', id: 'team-2', name: 'Red Hawks', sport: 'Basketball', members: ['theo@example.com'], score: 90 },
];
export const fallbackLeaderboard = [
    { _id: 'leaderboard-1', id: 'leaderboard-1', userId: 'user-1', name: 'Mina Chen', points: 140, rank: 1 },
    { _id: 'leaderboard-2', id: 'leaderboard-2', userId: 'user-2', name: 'Jules Ortiz', points: 118, rank: 2 },
    { _id: 'leaderboard-3', id: 'leaderboard-3', userId: 'user-3', name: 'Theo Brooks', points: 90, rank: 3 },
];
export const fallbackWorkouts = [
    { _id: 'workout-1', id: 'workout-1', title: 'Morning Run', type: 'cardio', durationMinutes: 20, difficulty: 'easy', description: 'A brisk run to build endurance.' },
    { _id: 'workout-2', id: 'workout-2', title: 'Strength Circuit', type: 'strength', durationMinutes: 30, difficulty: 'moderate', description: 'Bodyweight exercises for full-body strength.' },
];
