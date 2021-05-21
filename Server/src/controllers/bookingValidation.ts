import Joi from 'joi';

function validateRoomBooking(requestBody: Record<string, any>) {
    const schema = {
        hostid: Joi.string(),
        roomId: Joi.string(),
        name: Joi.string().required(),
        phone: Joi.number().required(),

    }
    const result = Joi.validate(requestBody, schema)
    if (result.error) {
        return result.error.details[0].message;
    } else {
        return null;
    }

}

export default validateRoomBooking;