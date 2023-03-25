const supertest = require('supertest');
const app = require('./server');

describe('GET /', () => {
  test('GET /', async () => {
    const response = await supertest(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Testing');
  });
});

describe('GET /quotes', () => {
  test('should return all quotes', async () => {
    const response = await supertest(app).get('/quotes');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('should return a specific quote', async () => {
    const response = await supertest(app).get('/quotes/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  })
});

describe('POST /quotes', () => {
  test('should create a new quote', async () => {
    const newQuote = {
      gal: 5,
      date: '2012-04-23T18:25:43.511Z',
    };

    const response = await supertest(app)
      .post('/quotes')
      .send(newQuote)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('address', '101 Main Street');
    expect(response.body).toHaveProperty('due', 10);
  });
});
