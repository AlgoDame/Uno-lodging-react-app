"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.put("/", async function (req, res, next) {
    // Implentation
    await res.send('respond with a resource');
});
exports.default = router;
