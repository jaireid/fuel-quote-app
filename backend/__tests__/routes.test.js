import supertest from "supertest";
import app from "../app.js";

describe("POST /api/users", () => {
    test("should register a new user", async () => {
        const userData = {
            username: "afi",
            email: "afi@example.com",
            password: "wsxedcrfv",
            state: "New York",
            city: "New York City"
        };

        const response = await supertest(app)
            .post("/api/users")
            .send(userData);

        console.log(response.body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("username", userData.username);
        expect(response.body).toHaveProperty("email", userData.email);
        expect(response.body).toHaveProperty("state", userData.state);
        expect(response.body).toHaveProperty("city", userData.city);
    });

    test("should return an error when registering a user with an existing email", async () => {
        const userData = {
            username: "test",
            email: "test@example.com",
            password: "test123",
            state: "Texas",
            city: "Houston"
        };

        const response = await supertest(app)
            .post("/api/users")
            .send(userData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User already exists");
    });
});