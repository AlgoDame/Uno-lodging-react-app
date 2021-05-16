"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginvalidation_1 = __importDefault(require("../controllers/loginvalidation"));
const router = express_1.Router();
const firebaseConfig_1 = require("../firebaseConfig");
const validateUser = (email, password, data) => {
    const user = data.filter((item) => item.email === email && item.password === password);
    return {
        status: user.length !== 0,
        data: user[0],
    };
};
router.post("/", function (req, res, next) {
    const error = loginvalidation_1.default(req.body);
    if (error) {
        return res.status(400).json({ status: "Error", message: error });
    }
    else {
        const { email, password, type } = req.body;
        switch (type) {
            case "host":
                firebaseConfig_1.db.collection("hosts")
                    .get()
                    .then((resp) => {
                    const hosts = resp.docs.map((doc) => ({ ...doc.data() }));
                    const userInfo = validateUser(email, password, hosts);
                    if (userInfo.status) {
                        return res
                            .status(200)
                            .json({ status: "Successful", data: userInfo.data });
                    }
                    else {
                        res.status(400).json({ status: "Invalid credentials" });
                    }
                    console.log(hosts);
                })
                    .catch((err) => console.log(err));
                break;
            case "guest":
                firebaseConfig_1.db.collection("guests")
                    .get()
                    .then((resp) => {
                    const guests = resp.docs.map((doc) => ({ ...doc.data() }));
                    const userInfo = validateUser(email, password, guests);
                    if (userInfo.status) {
                        return res
                            .status(200)
                            .json({ status: "Successful", data: userInfo.data });
                    }
                    else {
                        res.status(400).json({ status: "Invalid credentials" });
                    }
                    console.log(guests);
                })
                    .catch((err) => console.log(err));
                break;
            default:
                firebaseConfig_1.db.collection("admin")
                    .get()
                    .then((resp) => {
                    const admin = resp.docs.map((doc) => ({ ...doc.data() }));
                    const userInfo = validateUser(email, password, admin);
                    if (userInfo.status) {
                        return res
                            .status(200)
                            .json({ status: "Successful", data: userInfo.data });
                    }
                    else {
                        res.status(400).json({ status: "Invalid credentials" });
                    }
                    console.log(admin);
                })
                    .catch((err) => console.log(err));
                break;
        }
    }
});
exports.default = router;
