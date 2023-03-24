const supertest = require('supertest');
const app = require('./server');

describe('GET /', () => {
  test('GET / ', async () => {
    const response = await supertest(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Testing');
  });
});

describe('GET /quotes', () => {
  test('GET /quotes returns all quotes', async () => {
    const response = await supertest(app).get('/quotes');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('GET /quotes/:id returns a specific quote', async () => {
    const response = await supertest(app).get('/quotes/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  })
});
