"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listroomvalidation_1 = __importDefault(require("../controllers/listroomvalidation"));
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.post("/", function (req, res, next) {
    let allRooms = [];
    const error = listroomvalidation_1.default(req.body);
    if (error) {
        res.json({ status: "Error", message: error });
        return res.status(400).end();
    }
    else {
        firebaseConfig_1.db.collection("rooms")
            .get()
            .then((resp) => {
            allRooms = resp.docs.map((room) => ({ ...room.data() }));
            let ID = allRooms.length + 1;
            const body = req.body;
            firebaseConfig_1.db.collection("rooms")
                .doc(`${ID}`)
                .set(body)
                .then((resp) => {
                res.json({ status: "Successful", message: resp });
                return res.status(201).end();
            })
                .catch((err) => {
                res.json({ status: "Error", message: error });
                return res.status(400).end();
            });
        });
    }
});
exports.default = router;
