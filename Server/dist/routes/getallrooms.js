"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", function (req, res, next) {
    //implementation
    res.send('respond with a resource');
});
exports.default = router;
