// test.js
const request = require('supertest');
const app = require('../../client/src/App');

describe('GET /', () => {
  it('responds with 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});