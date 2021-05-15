import { Router, Request, Response, NextFunction } from "express";
const router = Router();
router.put("/", async function (req: Request, res: Response, next: NextFunction) {
    // Implentation
    await res.send('respond with a resource');
})

export default router;