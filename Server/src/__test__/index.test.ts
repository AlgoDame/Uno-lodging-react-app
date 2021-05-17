import request from "supertest";
import app from "../app";

describe("POST/ to log in a user ", () => {
  it("test if the user is able to login successfully", () => {
    request(app).post("/api/login").expect(200);
  });

  it("POST/ test if unregistered users is not able to login to the site", () => {
     request(app)
      .post("/api/login")
      .send({
        email: "test@testing.com",
        password: "testing",
      })
      .expect(400)
      .expect((res) => res.body.status === "Invalid credentials");
  });

  it("POST/ test with valid username and empty password results in failed login attempt", () => {
     request(app)
      .post("/api/login")
      .send({
        email: "emmanuel.elegbede@decagon.dev",
        password: "htndlefjel",
      })
      .expect(400)
      .expect((res) => res.body.status === "Invalid credentials");
  });

  it("POST/ test with empty username and valid password results in failed login attempt", () => {
     request(app)
      .post("/api/login")
      .send({
        email: " ",
        password: "emmanuel12",
      })
      .expect(400)
      .expect((res) => res.body.status === "Invalid credentials");
  });
});
