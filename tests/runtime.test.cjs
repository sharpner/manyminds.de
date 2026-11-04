const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');

// Deliberately load compiled JavaScript with native Node, without tsx.
const slots = require('../agent-files/runtime-build/api/slots.js').default;
const book = require('../agent-files/runtime-build/api/book.js').default;

test('compiled Node handlers start and serve calendar plus booking validation', async (t) => {
  assert.equal(typeof slots, 'function');
  assert.equal(typeof book, 'function');
  const app = express();
  app.use(express.json());
  app.all('/api/slots', slots);
  app.all('/api/book', book);
  const server = await new Promise((resolve) => {
    const running = app.listen(0, '127.0.0.1', () => resolve(running));
  });
  t.after(() => new Promise(resolve => {
    server.closeAllConnections();
    server.close(resolve);
  }));
  const base = `http://127.0.0.1:${server.address().port}`;
  const available = await fetch(`${base}/api/slots`);
  assert.equal(available.status, 200);
  const data = await available.json();
  assert.ok(Object.keys(data.slots).length > 0);
  assert.ok(Object.values(data.slots).every(times => times.length > 0));
  const method = await fetch(`${base}/api/book`);
  assert.equal(method.status, 405);
  const invalid = await fetch(`${base}/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}'
  });
  assert.equal(invalid.status, 400);
});
