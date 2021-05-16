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
        return res.status(400).json({ status: "Error", message: error });
    }
    const addUser = (category) => {
        firebaseConfig_1.db.collection(category)
            .add(req.body)
            .then((resp) => {
            return res
                .status(201)
                .json({ status: "Successful", data: req.body, resp });
        })
            .catch((err) => res.status(404).json({ err }));
    };
    switch (type) {
        case "host":
            firebaseConfig_1.db.collection("hosts")
                .get()
                .then((resp) => {
                const hosts = resp.docs.map((doc) => ({ ...doc.data() }));
                if (!hosts.find((host) => host.email === email)) {
                    addUser("hosts");
                }
                else {
                    return res.status(404).json({ message: "Email already exists!!!" });
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
                    return res.status(404).json({ message: "Email already exists!!!" });
                }
            });
    }
});
exports.default = router;
