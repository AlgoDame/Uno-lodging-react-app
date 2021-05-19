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
  const file = req.files;
  console.log(typeof file);

  if (file && file.length > 0) {
    const images = file.map(async (eachFile: any) => {
      const result = await cloudinary.uploader.upload(eachFile.path);
      console.log("I ran second");
      return result.url;
    });
    const imageArr = await Promise.all(images);
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
          let ID: number = allRooms.length + 1;
          const body = { ...req.body, imageArr };
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
