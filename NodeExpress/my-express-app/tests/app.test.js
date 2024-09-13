const request = require("supertest");
const app = require("../app");

describe("User API Endpoints", () => {
  // Test GET /api/users
  it("should fetch all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      { id: 1, name: "John Doe", email: "johndoe@gmail.com", age: 25 },
      { id: 2, name: "Jane Doe", email: "janedoe@gmail.com", age: 21 },
      { id: 3, name: "Vedat Cinbat" },
    ]);

    // Test GET /api/users/:id
    it("should fetch a single user", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
        age: 25,
      });
    });
  });
});
