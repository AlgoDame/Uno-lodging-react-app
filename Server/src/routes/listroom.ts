import express, { Router, Request, Response, NextFunction } from "express";
import validateRoomListing from "../controllers/listroomvalidation";
import upload from "../utils/multer";
import cloudinary from "../utils/cloudinary";
import { db } from "../firebaseConfig";
require("dotenv").config();

console.log(process.env.API_KEY);

const router = Router();

const app = express();

router.post("/", upload, async (req: Request | any, res) => {
  const body = req.body;
  const file = req.files;
  if (file && file.length > 0) {
    const images = file.map(async (eachFile: any) => {
      const result = await cloudinary.uploader.upload(eachFile.path);
      console.log("I ran second");
      return result.url;
    });
    const imageUrl = await Promise.all(images);
    let allRooms: Record<string, any>[] = [];
    const error = validateRoomListing(req.body);
    if (!error) {
      res.json({ status: "Error", message: "i got the error here" });
      return res.status(400).end();
    } else {
      db.collection("rooms")
        .get()
        .then((resp) => {
          allRooms = resp.docs.map((room) => ({ ...room.data() }));
          let ID: number = Date.now();
          const body = { ...req.body, imageUrl, roomId: ID, booked: false };
          db.collection("rooms")
            .doc(`${ID}`)
            .set(body)
            .then((resp) => {
              res.json({ status: "Successful", message: resp });
            })
            .catch((err) => {
              res.json({ status: "Error", message: error });
              return res.status(400).end();
            });
        });
    }
  }
});

export default router;
