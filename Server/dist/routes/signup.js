"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupvalidation_1 = __importDefault(require("../controllers/signupvalidation"));
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.post("/", function (req, res, next) {
    const error = signupvalidation_1.default(req.body);
    const { type, email } = req.body;
    if (error) {
        res.json({ status: "Error", message: error });
        return res.status(400).end();
    }
    const addUser = (category) => {
        let allUsers = [];
        firebaseConfig_1.db.collection(category)
            .get()
            .then((resp) => {
            allUsers = resp.docs.map((user) => ({ ...user.data() }));
            let ID = req.body.email;
            const body = { ...req.body, allUsers };
            firebaseConfig_1.db.collection(category)
                .doc(`${ID}`)
                .set(body)
                .then((resp) => {
                return res
                    .status(201)
                    .json({ status: "Successful", data: req.body, resp });
            })
                .catch((err) => {
                res.json({ err });
                return res.status(400).end();
            });
        });
    };
    switch (type) {
        case "host":
            firebaseConfig_1.db.collection("hosts")
                .get()
                .then((resp) => {
                const hosts = resp.docs.map((doc) => ({ ...doc.data() }));
                if (!hosts.find((host) => host.email.toLowerCase() === email.toLowerCase())) {
                    addUser("hosts");
                }
                else {
                    res.json({ message: "Email already exists!!!" });
                    return res.status(404).end();
                }
            });
            break;
        case "guest":
            firebaseConfig_1.db.collection("guests")
                .get()
                .then((resp) => {
                const guests = resp.docs.map((doc) => ({ ...doc.data() }));
                if (!guests.find((guest) => guest.email === email)) {
                    addUser("guests");
                }
                else {
                    res.json({ message: "Email already exists!!!" });
                    return res.status(404).end();
                }
            });
    }
});
exports.default = router;
