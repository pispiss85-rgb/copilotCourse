import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/server.js';
const endpoints = [
    { path: '/api/activities/', label: 'activities' },
    { path: '/api/leaderboard/', label: 'leaderboard' },
    { path: '/api/teams/', label: 'teams' },
    { path: '/api/users/', label: 'users' },
    { path: '/api/workouts/', label: 'workouts' },
];
test('API resource endpoints respond successfully', async () => {
    const server = app.listen(0);
    await new Promise((resolve) => {
        server.once('listening', () => resolve());
    });
    try {
        const address = server.address();
        const baseUrl = `http://127.0.0.1:${address.port}`;
        for (const endpoint of endpoints) {
            const response = await fetch(`${baseUrl}${endpoint.path}`);
            assert.equal(response.status, 200, `${endpoint.label} should respond with 200`);
            const body = await response.json();
            assert.ok(Array.isArray(body), `${endpoint.label} should return an array`);
        }
    }
    finally {
        await new Promise((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
        });
    }
});
