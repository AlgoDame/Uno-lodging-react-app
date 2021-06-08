import { Router, Request, Response, NextFunction } from "express";
import { db } from "../firebaseConfig";
const router = Router();
router.delete("/:id", async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    // id = JSON.stringify(id)
    // res.status(200).json({ id, type: `${type}s` })
    // let id = req.params.roomId
    const body = req.body
    db.collection("rooms")
        .doc(id)
        .delete()
        .then((resp) => res.status(200).json({ status: "Successful", resp }))
        .catch((err) => res.status(404).json(err));

})

export default router;