import { Router, Request, Response, NextFunction } from "express";
import validateLogin from "../controllers/loginvalidation";
const router = Router();
router.post("/", function (req: Request, res: Response, next: NextFunction) {
    const result = validateLogin(req.body);
    if (result) {
        return res.status(400).json({status: "Error", message: result})
    } else {
        return res.status(200).json({ status: "Successful", data: req.body })
    }
})
export default router;