import supertest from "supertest";
import app from "../app.js";
import { v4 as uuidv4 } from "uuid";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

describe("POST /api/quotes", () => {
  test("should create a new quote", async () => {
    // Generate a unique username
    const uniqueUsername = `user-${uuidv4()}`;

    // Set gallons and date
    const gallons = 10;
    const deliveryDate = new Date();

    // Create a mock user with the unique username
    const user = await User.create({
      username: uniqueUsername,
      email: `${uniqueUsername}@example.com`,
      password: "user-password",
      address: "user-address",
      zipcode: "00000",
      state: "user-state",
      city: "user-city",
      quotes: [],
    });

    // Create a mock response object with a cookie method
    const res = {
      cookie: jest.fn(),
    };

    // Generate a valid token associated with the user
    generateToken(res, user._id);

    // Make a request to the create quote route
    const response = await supertest(app)
      .post("/api/quotes")
      .set("Cookie", [`jwt=${res.cookie.mock.calls[0][1]}`])
      .send({
        gallons,
        deliveryDate,
        userId: user._id, // Include the user ID in the request payload
      });

    // Assertion
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("gallons", gallons);
    expect(response.body).toHaveProperty(
      "deliveryDate",
      deliveryDate.toISOString()
    );
    expect(response.body).toHaveProperty("suggestedPrice");
    expect(response.body).toHaveProperty("amountDue");
    expect(response.body).toHaveProperty("address", user.address);
    expect(response.body).toHaveProperty("zipcode", user.zipcode);
    expect(response.body).toHaveProperty("state", user.state);
    expect(response.body).toHaveProperty("city", user.city);

    // Check if the user's quotes array is updated
    const updatedUser = await User.findById(user._id);
    const quoteIds = updatedUser.quotes.map((quote) => quote.toString());
    expect(quoteIds).toContain(response.body._id.toString());
  });

  // test("should return an error when user is not found", async () => {

  // });
});