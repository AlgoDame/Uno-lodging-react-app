import { Router, Request, Response, NextFunction } from "express";
import { db } from "../firebaseConfig";
const router = Router();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  db.collection("hosts")
    .get()
    .then((resp) => {
      const allHosts = resp.docs.map((hosts) => ({ ...hosts.data() }));
      res.status(200).json(allHosts);
    });
});


export default router