import { Router, Request, Response, NextFunction } from "express";
import { db } from "../firebaseConfig";

const router = Router();
router.get(
  "/",
  function (req: Request, res: Response, next: NextFunction) {
    //implementation
    db.collection("rooms")
      .get()
      .then((resp) => {
        const allRooms = resp.docs.map((room) => ({ ...room.data() }));
        res.status(200).json(allRooms);
    });
  }
);
export default router;
