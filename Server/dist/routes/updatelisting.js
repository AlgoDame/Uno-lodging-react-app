"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.put("/:roomId", async function (req, res, next) {
    // Implentation
    let id = req.params.roomId;
    const body = req.body;
    // const error = validateRoomListing(req.body);
    // if (error) {
    //   res.json({ status: "Error", message: error });
    //   return res.status(400).end();
    // } else {
    // const updateUserById = (id,user) => {
    firebaseConfig_1.db.collection("rooms")
        .doc(id)
        .update(body)
        .then((res) => console.log("user updated successfully"))
        .catch((err) => console.log(err));
    // }
    // updateUserById('nlkmRw4qQhg32lgX7Gjf',{  name: "emmanuel",age: 27,address: { flatNo: 2, location: "Lagos, NG" }});
    //getUserbYId("nlkmRw4qQhg32lgX7Gjf");
    await res.json({ status: "Successful", message: `room ${id} updated successfully` });
});
exports.default = router;
