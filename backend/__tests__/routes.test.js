import supertest from "supertest";
import app from "../app.js";
import { v4 as uuidv4 } from "uuid";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

describe("POST /api/users", () => {
  test("should register a new user", async () => {
    // Generate a unique username and password
    const uniqueUsername = `user-${uuidv4()}`;

    const userData = {
      username: uniqueUsername,
      email: `${uniqueUsername}@example.com`,
      password: "user-password",
      address: "user-address",
      zipcode: "user-zipcode",
      state: "user-state",
      city: "user-city",
    };

    // Make a request to the users route
    const response = await supertest(app).post("/api/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("username", userData.username);
    expect(response.body).toHaveProperty("email", userData.email);
    expect(response.body).toHaveProperty("address", userData.address);
    expect(response.body).toHaveProperty("zipcode", userData.zipcode);
    expect(response.body).toHaveProperty("state", userData.state);
    expect(response.body).toHaveProperty("city", userData.city);
  });

  test("should return an error when registering a user with an existing email", async () => {
    const userData = {
      username: "test",
      email: "test@example.com",
      password: "test123",
      address: "101 Main St.",
      zipcode: "77005",
      state: "Texas",
      city: "Houston",
    };

    // Make a request to the users route with existing user
    const response = await supertest(app).post("/api/users").send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });
});

describe("POST /api/users/auth", () => {
  test("should authenticate a user with valid credentials", async () => {
    const credentials = {
      email: "qwerty@example.com",
      password: "testpassword",
    };

    // Make a request to the users auth route
    const response = await supertest(app)
      .post("/api/users/auth")
      .send(credentials);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("email", credentials.email);
  });

  test("should return an error when authenticating a user with invalid credentials", async () => {
    const credentials = {
      email: "test@example.com",
      password: "test1234",
    };

    // Make a request to the users auth route without valid password
    const response = await supertest(app)
      .post("/api/users/auth")
      .send(credentials);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });
});

describe("POST /api/users/logout", () => {
  test("should log out the user", async () => {
    // Make a request to the logout route
    const response = await supertest(app).post("/api/users/logout").send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "User logged out" });
    expect(response.header["set-cookie"]).toBeDefined();
  });
});

describe("GET /api/users/profile", () => {
  test("should get the user profile", async () => {
    // Generate a unique username
    const uniqueUsername = `user-${uuidv4()}`;

    // Create a mock user with the unique username
    const user = await User.create({
      username: uniqueUsername,
      email: `${uniqueUsername}@example.com`,
      password: "user-password",
      address: "user-address",
      zipcode: "user-zipcode",
      state: "user-state",
      city: "user-city",
    });

    // Create a mock responce object with a cookie method
    const res = {
      cookie: jest.fn(),
    };

    // Generate a valid token associated with the user
    generateToken(res, user._id);

    // Make a request to the get user profile route
    const response = await supertest(app)
      .get("/api/users/profile")
      .set("Cookie", [`jwt=${res.cookie.mock.calls[0][1]}`]);

    expect(response.body).toEqual({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      address: user.address,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
    });
  });

  test("should return an error when user is not authenticated", async () => {
    // Make a request to the get user profile route without authentication
    const response = await supertest(app).get("/api/users/profile").send();

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Not authorized, no token");
  });
});

describe("PUT /api/users/profile", () => {
  test("should update the user profile", async () => {
    // Generate a unique username
    const uniqueUsername = `user-${uuidv4()}`;
    const updatedUsername = `user-${uuidv4()}`;

    // Create a mock user with the unique username
    const user = await User.create({
      username: uniqueUsername,
      email: `${uniqueUsername}@example.com`,
      password: "user-password",
      address: "user-address",
      zipcode: "user-zipcode",
      state: "user-state",
      city: "user-city",
    });

    // Create a mock responce object with a cookie method
    const res = {
      cookie: jest.fn(),
    };

    // Generate a valid token associated with the user
    generateToken(res, user._id);

    // Make a request to the update user profile route
    const response = await supertest(app)
      .put("/api/users/profile")
      .set("Cookie", [`jwt=${res.cookie.mock.calls[0][1]}`])
      .send({
        username: updatedUsername,
        email: `${updatedUsername}@example.com`,
        state: "updated-state",
        city: "updated-city",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      _id: user._id.toString(),
      username: updatedUsername,
      email: `${updatedUsername}@example.com`,
      address: "user-address",
      zipcode: "user-zipcode",
      state: "updated-state",
      city: "updated-city",
    });
  });

  test("should return an error when user is not authenticated", async () => {
    // Make a request to the update user profile route without authentication
    const response = await supertest(app).put("/api/users/profile").send({
      username: "updated-username",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Not authorized, no token");
  });

  test("should return an error when user is not found", async () => {
    // Make a request to the update user profile route with an invalid token
    const response = await supertest(app)
      .put("/api/users/profile")
      .set("Cookie", ["jwt=invalid-token"])
      .send({
        username: "updated-username",
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Not authorized, invalid token");
  });
});
