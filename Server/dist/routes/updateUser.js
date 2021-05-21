"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.put("/:id", async function (req, res, next) {
    let { type } = req.query;
    const { id } = req.params;
    // id = JSON.stringify(id)
    // res.status(200).json({ id, type: `${type}s` })
    // let id = req.params.roomId
    const body = req.body;
    firebaseConfig_1.db.collection(`${type}s`)
        .doc(id)
        .update(body)
        .then((resp) => res.status(200).json({ status: "Successful", resp }))
        .catch((err) => res.status(404).json(err));
    // await res.json({ status: "Successful", message: `room ${id} updated successfully` });
});
exports.default = router;
