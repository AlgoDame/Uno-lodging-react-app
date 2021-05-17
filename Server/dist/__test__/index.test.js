"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("POST/ to log in a user ", () => {
    it("test if the user is able to login successfully", () => {
        supertest_1.default(app_1.default).post("/api/login").expect(200);
    });
    it("POST/ test if unregistered users is not able to login to the site", () => {
        supertest_1.default(app_1.default)
            .post("/api/login")
            .send({
            email: "test@testing.com",
            password: "testing",
        })
            .expect(400)
            .expect((res) => res.body.status === "Invalid credentials");
    });
    it("POST/ test with valid username and empty password results in failed login attempt", () => {
        supertest_1.default(app_1.default)
            .post("/api/login")
            .send({
            email: "emmanuel.elegbede@decagon.dev",
            password: "htndlefjel",
        })
            .expect(400)
            .expect((res) => res.body.status === "Invalid credentials");
    });
    it("POST/ test with empty username and valid password results in failed login attempt", () => {
        supertest_1.default(app_1.default)
            .post("/api/login")
            .send({
            email: " ",
            password: "emmanuel12",
        })
            .expect(400)
            .expect((res) => res.body.status === "Invalid credentials");
    });
});
