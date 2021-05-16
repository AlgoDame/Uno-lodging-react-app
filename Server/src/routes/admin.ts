import { Router, Request, Response, NextFunction } from "express";
const router = Router();
router.get("/", function (req: Request, res: Response, next: NextFunction) {
    // implementation
    res.send('respond with a resource');
})

export default router;