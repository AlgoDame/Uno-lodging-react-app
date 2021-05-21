"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const bookingValidation_1 = __importDefault(require("../controllers/bookingValidation"));
const router = express_1.Router();
router.post('/', (req, res, next) => {
    const error = bookingValidation_1.default(req.body);
    if (error) {
        res.json({ status: "Error", message: error });
        return res.status(400).end();
    }
    else {
        const id = req.body.hostid;
        const body = { ...req.body, bookingDate: new Date() };
        firebaseConfig_1.db.collection("bookings")
            .doc(`${id}`)
            .set(body)
            .then((resp) => {
            return res.status(200)
                .json({ status: "Successful", message: `room ${req.body.roomId} booked successfully` });
        })
            .catch(e => {
            res.json({ status: "error", message: e });
            return res.status(400).end();
        });
    }
});
exports.default = router;
