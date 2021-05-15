"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupvalidation_1 = __importDefault(require("../controllers/signupvalidation"));
const firebaseConfig_1 = require("../firebaseConfig");
const firebase_1 = __importDefault(require("firebase"));
const router = express_1.Router();
// interface Signup {
//  firstname: string,
//  lastname: string,
//  phone: number,
//  email: string,
//  password: string,
//  type: string,
//     favorites?: string[]
// }
const db = firebase_1.default.initializeApp(firebaseConfig_1.firebaseConfig).firestore();
router.post("/", function (req, res, next) {
    const result = signupvalidation_1.default(req.body);
    if (result) {
        return res.status(400).json({ status: "Error", message: result });
    }
    else {
        db.collection('hosts')
            .add({
            id: 1,
            name: "host1"
        })
            .then((resp) => res.status(201).json({ status: "Successful", data: req.body, resp }))
            .catch((err) => res.status(404).json({ err }));
    }
});
exports.default = router;
