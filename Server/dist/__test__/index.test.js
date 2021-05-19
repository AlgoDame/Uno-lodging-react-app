"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("POST/ LOGGING A USER", () => {
    it("test if the user is able to login successfully", () => {
        supertest_1.default(app_1.default).post("/api/login").expect(200);
    });
    it("test if unregistered users is not able to login to the site", () => {
        supertest_1.default(app_1.default)
            .post("/api/login")
            .send({
            email: "test@testing.com",
            password: "testing",
        })
            .expect(401)
            .expect((res) => res.body.status === "invalid credentials");
    });
    it("test with valid username and empty password results in failed login attempt", () => {
        supertest_1.default(app_1.default)
            .post("/api/login")
            .send({
            email: "emmanuel.elegbede@decagon.dev",
            password: "htndlefjel",
        })
            .expect(400)
            .expect((res) => res.body.status === "Invalid credentials");
    });
    it("test with empty username and valid password results in failed login attempt", () => {
        supertest_1.default(app_1.default)
            .post("/api/login")
            .send({
            email: " ",
            password: "emmanuel12",
        })
            .expect(400)
            .expect((res) => res.body.status === "Invalid credentials");
    });
    it("test with empty username and empty results in failed login attempt", () => {
        supertest_1.default(app_1.default)
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
        supertest_1.default(app_1.default)
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
        supertest_1.default(app_1.default)
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
        supertest_1.default(app_1.default).get("/api/rooms");
        expect(200);
    });
    it("returns all the rooms from the database", () => {
        supertest_1.default(app_1.default).get("/api/rooms");
        expect(200);
    });
});
