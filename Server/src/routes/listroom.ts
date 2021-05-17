import { Router, Request, Response, NextFunction } from "express";
import validateRoomListing from "../controllers/listroomvalidation";
import { db } from "../firebaseConfig";
const router = Router();

router.post("/", function (req: Request, res: Response, next: NextFunction) {
  let allRooms: Record<string, any>[] = [];
  const error = validateRoomListing(req.body);
  if (error) {
    res.json({ status: "Error", message: error });
    return res.status(400).end();
  } else {
    db.collection("rooms")
      .get()
      .then((resp) => {
        allRooms = resp.docs.map((room) => ({ ...room.data() }));
        let ID: number = allRooms.length + 1;
        const body = req.body;
        db.collection("rooms")
          .doc(`${ID}`)
          .set(body)
          .then((resp) => {
            res.json({ status: "Successful", message: resp });
            return res.status(201).end();
          })
          .catch((err) => {
            res.json({ status: "Error", message: error });
            return res.status(400).end();
          });
      });
  }
});

export default router;
