import { Router, Response, Request, NextFunction } from 'express';
import { db } from '../firebaseConfig';
import bookingValidation from '../controllers/bookingValidation';


const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const error = bookingValidation(req.body);
    if (error) {
        res.json({ status: "Error", message: error });
        return res.status(400).end();
    }
    else {
        const id = req.body.hostid;
        const body = { ...req.body, bookingDate: new Date() }
        db.collection("bookings")
            .doc(`${id}`)
            .set(body)
            .then((resp) => {
                return res.status(200)
                    .json({ status: "Successful", message: `room ${req.body.roomId} booked successfully` });
            })
            .catch(e => {
                res.json({ status: "error", message: e });
                return res.status(400).end()
            })
    }

})


export default router



