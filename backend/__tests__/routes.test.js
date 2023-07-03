import supertest from "supertest";
import app from "../app.js";

describe("POST /api/users", () => {
    // test("should register a new user", async () => {
    //     const userData = {
    //         username: "afi",
    //         email: "afi@example.com",
    //         password: "wsxedcrfv",
    //         state: "New York",
    //         city: "New York City"
    //     };

    //     const response = await supertest(app)
    //         .post("/api/users")
    //         .send(userData);

    //     console.log(response.body);

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty("_id");
    //     expect(response.body).toHaveProperty("username", userData.username);
    //     expect(response.body).toHaveProperty("email", userData.email);
    //     expect(response.body).toHaveProperty("state", userData.state);
    //     expect(response.body).toHaveProperty("city", userData.city);
    // });

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

describe("POST /api/users/auth", () => {
    test("should authenticate a user with valid credentials", async () => {
        const credentials = {
            email: "qwerty@example.com",
            password: "testpassword"
        };

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
            password: "test1234"
        };

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
        const response = await supertest(app)
            .post("/api/users/logout")
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "User logged out" });
        expect(response.header["set-cookie"]).toBeDefined();
    });
});