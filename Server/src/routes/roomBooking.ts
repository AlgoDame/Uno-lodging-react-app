import { Router, Response, Request, NextFunction } from 'express';
import { db } from '../firebaseConfig';
import bookingValidation from '../controllers/bookingValidation';


const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const error  = bookingValidation(req.body);
    if (error) {
        res.json({ status: "Error", message: error });
        return res.status(400).end();
    } 
    else
    {
        db.collection("bookings")
        .get()
        .then((resp) => {
            let bookings = resp.docs.map((booking) => ({ ...booking.data() }));
            return res.status(200)
            .json({ status: "Successful", message: bookings });
        })
    }
    
})


export default router



