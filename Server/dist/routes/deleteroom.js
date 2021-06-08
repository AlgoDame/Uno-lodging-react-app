"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.delete("/:id", async function (req, res, next) {
    const { id } = req.params;
    // id = JSON.stringify(id)
    // res.status(200).json({ id, type: `${type}s` })
    // let id = req.params.roomId
    const body = req.body;
    firebaseConfig_1.db.collection("rooms")
        .doc(id)
        .delete()
        .then((resp) => res.status(200).json({ status: "Successful", resp }))
        .catch((err) => res.status(404).json(err));
});
exports.default = router;
