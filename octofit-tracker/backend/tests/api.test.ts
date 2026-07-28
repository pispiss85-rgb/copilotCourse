import test from 'node:test';
import assert from 'node:assert/strict';
import { getApiBaseUrl } from '../src/config/api.js';

test('getApiBaseUrl uses a Codespaces URL when CODESPACE_NAME is set', () => {
  const url = getApiBaseUrl('octofit-app', 8000);
  assert.equal(url, 'https://octofit-app-8000.app.github.dev');
});

test('getApiBaseUrl falls back to localhost for local development', () => {
  const previous = process.env.CODESPACE_NAME;
  delete process.env.CODESPACE_NAME;

  try {
    const url = getApiBaseUrl(undefined, 8000);
    assert.equal(url, 'http://localhost:8000');
  } finally {
    if (previous !== undefined) {
      process.env.CODESPACE_NAME = previous;
    }
  }
});
