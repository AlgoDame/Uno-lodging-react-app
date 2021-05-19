import { Router, Request, Response, NextFunction } from "express";
import validateRoomListing from "../controllers/listroomvalidation";
import { db } from "../firebaseConfig";

const router = Router();

router.put(
  "/:roomId",
  async function (req: Request, res: Response, next: NextFunction) {
    // Implentation
    let id = req.params.roomId
    const { body } = req.body
    const error = validateRoomListing(req.body);
    if (error) {
      res.json({ status: "Error", message: error });
      return res.status(400).end();
    } else {
      // const updateUserById = (id,user) => {
      db.collection("user")
        .doc(id)
        .set(body)
        .then((res) => console.log("user updated successfully"))
        .catch((err) => console.log(err));
    }

    // updateUserById('nlkmRw4qQhg32lgX7Gjf',{  name: "emmanuel",age: 27,address: { flatNo: 2, location: "Lagos, NG" }});
    //getUserbYId("nlkmRw4qQhg32lgX7Gjf");

    await res.send("respond with a resource");
  }
);

export default router;
