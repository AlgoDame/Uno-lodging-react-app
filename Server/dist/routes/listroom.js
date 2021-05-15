"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listroomvalidation_1 = __importDefault(require("../controllers/listroomvalidation"));
const router = express_1.Router();
router.post('/', function (req, res, next) {
    const result = listroomvalidation_1.default(req.body);
    if (result) {
        return res.status(400).json({ status: "Error", message: result });
    }
    else {
        return res.status(201).json({ status: "Successful", data: req.body });
    }
});
exports.default = router;
