"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.get('/', function (req, res, next) {
    firebaseConfig_1.db.collection('guests')
        .get()
        .then((resp) => {
        const guests = resp.docs.map((guest) => ({ ...guest.data() }));
        return res.status(200).json(guests);
    });
});
exports.default = router;
