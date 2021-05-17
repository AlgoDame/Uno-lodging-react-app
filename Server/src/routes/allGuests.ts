import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../firebaseConfig';

const router = Router();

router.get('/', function(req: Request, res: Response, next: NextFunction){

    db.collection('guests')
    .get()
    .then((resp) => {
        const guests = resp.docs.map((guest) => ({...guest.data()}))
        return res.status(200).json(guests);
    })
})


export default router