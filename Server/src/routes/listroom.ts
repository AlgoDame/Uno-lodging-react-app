import { Router, Request, Response, NextFunction } from 'express';
import validateRoomListing from "../controllers/listroomvalidation";
const router = Router();
router.post('/', function (req: Request, res: Response, next: NextFunction) {
    const result = validateRoomListing(req.body);
    if (result) {
        return res.status(400).json({status: "Error", message: result})
    } else {
        return res.status(201).json({status: "Successful", data: req.body})
    }
})

export default router;