import { Router, Request, Response, NextFunction } from "express";
import validateLogin from "../controllers/loginvalidation";
const router = Router();
import { db } from "../firebaseConfig";

interface Data {
  [x: string]: any;
}

const validateUser = (email: string, password: string, data: Data[]) => {
  const user = data.filter(
    (item: Data) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
  );
  return {
    status: user.length !== 0,
    data: user[0],
  };
};

router.post("/", function (req: Request, res: Response, next: NextFunction) {
  const error = validateLogin(req.body);
  if (error) {
    res.json({ status: "Error", message: error });
    return res.status(400).end()
  } else {
    const { email, password, type } = req.body;
    switch (type) {
      case "host":
        db.collection("hosts")
          .get()
          .then((resp) => {
            const hosts = resp.docs.map((doc) => ({ ...doc.data() }));
            const userInfo = validateUser(email, password, hosts);
            if (userInfo.status) {
              return res
                .status(200)
                .json({ status: "Successful", data: userInfo.data });
            } else {
              res.json({ status: "Invalid credentials" });
              return res.status(404).end()
            }
            console.log(hosts);
          })
          .catch((err) => console.log(err));
        break;
      case "guest":
        db.collection("guests")
          .get()
          .then((resp) => {
            const guests = resp.docs.map((doc) => ({ ...doc.data() }));
            const userInfo = validateUser(email, password, guests);
            if (userInfo.status) {
              return res
                .status(200)
                .json({ status: "Successful", data: userInfo.data });
            } else {
              res.json({ status: "Invalid credentials" });
              return res.status(404).end()

            }
            // console.log(guests);
          })
          .catch((err) => console.log(err));
        break;
      default:
        db.collection("admin")
          .get()
          .then((resp) => {
            const admin = resp.docs.map((doc) => ({ ...doc.data() }));
            const userInfo = validateUser(email, password, admin);
            if (userInfo.status) {
              return res
                .status(200)
                .json({ status: "Successful", data: userInfo.data });
            } else {
              res.json({ status: "Invalid credentials" });
              return res.status(404).end()
            }
            // console.log(admin);
          })
          .catch((err) => console.log(err));
        break;
    }
  }
});
export default router;
