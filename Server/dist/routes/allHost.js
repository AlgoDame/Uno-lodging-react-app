"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.get("/", function (req, res, next) {
    firebaseConfig_1.db.collection("hosts")
        .get()
        .then((resp) => {
        const allHosts = resp.docs.map((hosts) => ({ ...hosts.data() }));
        res.status(200).json(allHosts);
    });
});
exports.default = router;
