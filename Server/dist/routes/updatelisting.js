"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listroomvalidation_1 = __importDefault(require("../controllers/listroomvalidation"));
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.put("/:roomId", async function (req, res, next) {
    // Implentation
    let id = req.params.roomId;
    const { body } = req.body;
    const error = listroomvalidation_1.default(req.body);
    if (error) {
        res.json({ status: "Error", message: error });
        return res.status(400).end();
    }
    else {
        // const updateUserById = (id,user) => {
        firebaseConfig_1.db.collection("user")
            .doc(id)
            .set(body)
            .then((res) => console.log("user updated successfully"))
            .catch((err) => console.log(err));
    }
    // updateUserById('nlkmRw4qQhg32lgX7Gjf',{  name: "emmanuel",age: 27,address: { flatNo: 2, location: "Lagos, NG" }});
    //getUserbYId("nlkmRw4qQhg32lgX7Gjf");
    await res.send("respond with a resource");
});
exports.default = router;
