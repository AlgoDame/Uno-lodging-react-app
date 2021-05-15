import { Router, Request, Response, NextFunction } from "express";
import validateSignup from "../controllers/signupvalidation";
import { firebaseConfig } from "../firebaseConfig";
import firebase from "firebase"
const router = Router();

// interface Signup {
//  firstname: string,
//  lastname: string,
//  phone: number,
//  email: string,
//  password: string,
//  type: string,
//     favorites?: string[]
// }
const db = firebase.initializeApp(firebaseConfig).firestore();
router.post("/", function (req: Request, res: Response, next: NextFunction) {
   const result = validateSignup(req.body);
   if (result) {
      return res.status(400).json({ status: "Error", message: result });
   } else {
      db.collection('hosts')
         .add({
            id: 1,
            name: "host1"
         })
         .then((resp) => res.status(201).json({ status: "Successful", data: req.body, resp }))
         .catch((err) => res.status(404).json({ err }));

   }

})

export default router;