import express, { Router, Request, Response, NextFunction } from 'express';
import { db } from "../firebaseConfig";

const router = Router();

router.put(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    let { type } = req.query;
    const { id } = req.params;
    // id = JSON.stringify(id)
    // res.status(200).json({ id, type: `${type}s` })
    // let id = req.params.roomId
    const body = req.body
    db.collection(`${type}s`)
      .doc(id)
      .update(body)
      .then((resp) => res.status(200).json({ status: "Successful", resp }))
      .catch((err) => res.status(404).json(err));


    // await res.json({ status: "Successful", message: `room ${id} updated successfully` });
  }
);


export default router;
