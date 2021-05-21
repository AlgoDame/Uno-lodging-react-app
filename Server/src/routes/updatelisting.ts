import { Router, Request, Response, NextFunction } from "express";
import validateRoomListing from "../controllers/listroomvalidation";
import { db } from "../firebaseConfig";

const router = Router();

router.put(
  "/:roomId",
  async function (req: Request, res: Response, next: NextFunction) {
    // Implentation
    let id = req.params.roomId
    const body = req.body
    // const error = validateRoomListing(req.body);
    // if (error) {
    //   res.json({ status: "Error", message: error });
    //   return res.status(400).end();
    // } else {
    // const updateUserById = (id,user) => {
    db.collection("rooms")
      .doc(id)
      .update(body)
      .then((res) => console.log("room updated successfully"))
      .catch((err) => console.log(err));
    // }

    // updateUserById('nlkmRw4qQhg32lgX7Gjf',{  name: "emmanuel",age: 27,address: { flatNo: 2, location: "Lagos, NG" }});
    //getUserbYId("nlkmRw4qQhg32lgX7Gjf");

    await res.json({status: "Successful", message:`room ${id} updated successfully`});
  }
);

export default router;
