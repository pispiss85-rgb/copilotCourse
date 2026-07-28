import test from 'node:test';
import assert from 'node:assert/strict';
import { buildConnectionString } from '../src/config/database.js';

test('buildConnectionString uses the provided URI when available', () => {
  const uri = buildConnectionString('mongodb://custom-host:27017/octofit_db');
  assert.equal(uri, 'mongodb://custom-host:27017/octofit_db');
});

test('buildConnectionString falls back to the local development database', () => {
  const uri = buildConnectionString(undefined);
  assert.equal(uri, 'mongodb://localhost:27017/octofit_db');
});
