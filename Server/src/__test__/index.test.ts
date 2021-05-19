import request from "supertest";
import app from "../app";

describe("POST/ LOGGING A USER", () => {
  it("test if the user is able to login successfully", () => {
    request(app).post("/api/login").expect(200);
  });

  it("test if unregistered users is not able to login to the site", () => {
      request(app)
        .post("/api/login")
        .send({
          email: "test@testing.com",
          password: "testing",
        })
        .expect(401)
        .expect((res) => res.body.status === "invalid credentials")
       

  });

  it("test with valid username and empty password results in failed login attempt", () => {
    request(app)
      .post("/api/login")
      .send({
        email: "emmanuel.elegbede@decagon.dev",
        password: "htndlefjel",
      })
      .expect(400)
      .expect((res) => res.body.status === "Invalid credentials");
  });

  it("test with empty username and valid password results in failed login attempt", () => {
    request(app)
      .post("/api/login")
      .send({
        email: " ",
        password: "emmanuel12",
      })
      .expect(400)
      .expect((res) => res.body.status === "Invalid credentials");
  });

  it("test with empty username and empty results in failed login attempt", () => {
    request(app)
      .post("/api/login")
      .send({
        email: " ",
        password: "",
      })
      .expect(400)
      .expect((res) => res.body.status === "Invalid credentials");
});
});
describe("POST/ SIGN UP OF A GUEST", () => {
  it("test for successfull sign up of a guest", () => {
    request(app)
      .post("/api/signup")
      .send({
        firstName: "aderemi",
        lastName: "gabriel",
        phone: "08150512328",
        email: "gabrieladeremi@yahoo.com",
        password: "*********",
        type: "guest",
      })
      .expect(200)
      .expect((res) => res.body.status === "successful");
  });

  it("test for unsuccessful sign up of a guest", () => {
    request(app)
      .post("/api/signup")
      .send({
        firstName: "aderemi",
        lastName: "gabriel",
        phone: "",
        email: "",
        password: "*********",
        type: "guest",
      })
      .expect(400)
      .expect((res) => res.body.status === "sign up not successful");
  });
});

describe("GET all rooms and users", () => {
  it("returns all the rooms from the database", () => {
    request(app).get("/api/rooms");
    expect(200);
  });

  it("returns all the rooms from the database", () => {
    request(app).get("/api/rooms");
    expect(200);
  });
});
