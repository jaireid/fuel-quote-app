const supertest = require('supertest');
const app = require('./server');

// describe('GET /', () => {
//   test('GET /', async () => {
//     const response = await supertest(app).get('/');

//     expect(response.status).toBe(200);
//     expect(response.text).toBe('Testing');
//   });
// });

describe('GET /quotes', () => {
  test('should return all quotes', async () => {
    const response = await supertest(app).get('/quotes');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('should return a specific quote', async () => {
    const response = await supertest(app).get('/quotes/fill');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('address', '101 Main Street');
  })
});

describe('POST /quotes', () => {
  test('should create a new quote', async () => {
    const newQuote = {
      id: 7,
      gallons: 8,
      deliveryDate: new Date('1995-12-17T03:24:00'),
      address: '101 Main Street',
      price: 2,
      due: 16,
    };

    const response = await supertest(app)
    .post('/quotes')
    .send(newQuote)
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('address', '101 Main Street');
  });
});


describe('POST /login', () => {
  test('should return "Login successful" if valid credentials are provided', async () => {
    const newLogin = {
      id: 1,
      username: 'dylantest',
      password: '$2b$10$hmJJx1plF9NmgNuXLqksn.y4VpX0iT3/X/sgNz'
    };

    const response = await supertest(app)
    .post('/login')
    .send(newLogin);

    expect(response.status).toBe(200);
  });

  test('should return "Invalid login credentials" if invalid credentials are provided', async () => {
    const response = await supertest(app).get('/login?username=user1234&password=wrong');

    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid login credentials');
  });
});

