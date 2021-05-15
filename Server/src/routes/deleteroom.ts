import { Router, Request, Response, NextFunction } from "express";
const router = Router();
router.delete("/", function(req: Request, res: Response, next: NextFunction){
    // implentation
    res.send("respond with resource");
})

export default router;