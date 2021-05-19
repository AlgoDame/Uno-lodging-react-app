import Joi from 'joi';

function validateRoomBooking(requestBody:Record<string, any>) {
    const schema = {
        hostId: Joi.string().required(),
        roomId: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.number().required(),
        date: Joi.string().required(),
        
    }
    const result = Joi.validate(requestBody, schema)
    if (result.error) {
        return result.error.details[0].message;
    } else {
        return null;
    }
    
}

export default validateRoomBooking;