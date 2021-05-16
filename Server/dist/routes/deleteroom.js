"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.delete("/", function (req, res, next) {
    // implentation
    res.send("respond with resource");
});
exports.default = router;
