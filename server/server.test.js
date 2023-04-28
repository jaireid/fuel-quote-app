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
  test('should return "Invalid login credentials" if password is incorrect', async () => {
    const newLogin = {
      id: 1,
      username: 'username',
      password: 'wrongPassword'
    };
  
    const response = await supertest(app)
    .post('/login')
    .send(newLogin);
  
    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid login credentials');
  });
  
  test('should return "Invalid login credentials" if username is incorrect', async () => {
    const newLogin = {
      id: 1,
      username: 'wrongUsername',
      password: 'password123password123'
    };
  
    const response = await supertest(app)
    .post('/login')
    .send(newLogin);
  
    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid login credentials');
  });
});


describe('POST /register', () => {

  it('should return a 400 status if the username is already taken', async () => {
    const response = await supertest(app).post('/register').send({
      username: 'kyle',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Username already taken');
  });

  it('should return a 400 status if the 2 passwords dont match', async () => {
    const response = await supertest(app).post('/register').send({
      username: 'kyle',
      password: 'password',
      confirmPassword: 'password123',
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Passwords do not match');
  });

  describe('POST /profile', () => {

    it('should return a 400 status if the required fields are not provided', async () => {
      const response = await supertest(app).post('/profile').send({});
      expect(response.status).toBe(400);
      expect(response.text).toBe('Missing required fields');
    });

    it('should return a 400 status if name is over 50 or more characters', async () => {
      const response = await supertest(app).post('/profile').send({
        name: "123456789012345678901234567890123456789012345678901",
        city: "houston",
        region: "tx",
        zipcode: "77002",
        address1: "101 main street",
        address2: "101 main street"
      })
      expect(response.status).toBe(400)
      expect(response.text).toBe('Name cannot exceed 50 characters');
    });

    it('should return a 400 status if address 1 is over 100 or more characters', async () => {
      const response = await supertest(app).post('/profile').send({
        name: "kyle",
        city: "houston",
        region: "tx",
        zipcode: "77002",
        address1: "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901",
        address2: "101 main street"
      })
      expect(response.status).toBe(400)
      expect(response.text).toBe('Address 1 cannot exceed 100 characters');
    });

    it('should return a 400 status if city is over 100 or more characters', async () => {
      const response = await supertest(app).post('/profile').send({
        name: "kyle",
        city: "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901",
        region: "tx",
        zipcode: "77002",
        address1: "101 main street",
        address2: "101 main street"
      })
      expect(response.status).toBe(400)
      expect(response.text).toBe('City cannot exceed 100 characters');
    });

    it('should return a 400 status if zipcode is over 9 or more below 5 digits', async () => {
      const response = await supertest(app).post('/profile').send({
        name: "kyle",
        city: "houston",
        region: "tx",
        zipcode: "1",
        address1: "101 main street",
        address2: "101 main street"
      })
      expect(response.status).toBe(400)
      expect(response.text).toBe('Zipcode must be between 5 and 9 digits');
    });
    
    it('should create a new profile', async () => {
      const response = await supertest(app).post('/profile').send({
        name: "kyle",
        city: "houston",
        region: "tx",
        zipcode: "77002",
        address1: "101 main street",
        address2: "101 main street"
      })
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'kyle');
    });
  })
});
