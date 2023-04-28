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
      username: 'test123test123',
      password: 'password123password123'
    };

    const response = await supertest(app)
    .post('/login')
    .send(newLogin);

    expect(response.status).toBe(200);
  });

  test('should return "Invalid login credentials" if valid credentials are provided', async () => {
    const newLogin = {
      id: 1,
      username: 'dylant',
      password: 'wrongPassword'
    };
    const response = await supertest(app)
    .post('/login')
    .send(newLogin);

    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid login credentials');
  });
});


describe('POST /register', () => {
  // it('should create a new user and return a 200 status if all fields are provided and passwords match', async () => {
  //   const response = await supertest(app).post('/register').send({
  //     username: 'testuser',
  //     password: 'password123',
  //     confirmPassword: 'password123',
  //   });
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('id');
  //   expect(response.body).toHaveProperty('username', 'testuser');
  //   expect(response.body).toHaveProperty('password');
  // });

  it('should return a 400 status if the username is already taken', async () => {
    const response = await supertest(app).post('/register').send({
      username: 'kyle',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Username already taken');
  });

});
