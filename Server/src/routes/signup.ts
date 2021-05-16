import { Router, Request, Response, NextFunction } from "express";
import validateSignup from "../controllers/signupvalidation";
import { db } from "../firebaseConfig";
const router = Router();

router.post("/", function (req: Request, res: Response, next: NextFunction) {
  const error = validateSignup(req.body);
  const { type, email } = req.body;
  if (error) {
    return res.status(400).json({ status: "Error", message: error });
  }
  const addUser = (category: string) => {
   db.collection(category)
     .add(req.body)
     .then((resp) => {
       return res
         .status(201)
         .json({ status: "Successful", data: req.body, resp });
     })
     .catch((err) => res.status(404).json({ err }));
 };


  switch (type) {
    case "host":
      db.collection("hosts")
        .get()
        .then((resp) => {
          const hosts = resp.docs.map((doc) => ({ ...doc.data() }));
          if (!hosts.find((host) => host.email === email)) {
            addUser("hosts");
          } else {
            return res.status(404).json({ message: "Email already exists!!!" });
          }
        });
      
      break;
    case "guest":
      db.collection("guests")
      .get()
      .then((resp) => {
        const guests = resp.docs.map((doc) => ({ ...doc.data() }));
        if (!guests.find((guest) => guest.email === email)) {
          addUser("guests");
        } else {
          return res.status(404).json({ message: "Email already exists!!!" });
        }
      });
  }
});

export default router;
