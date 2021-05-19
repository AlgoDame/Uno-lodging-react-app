import Joi from 'joi';

function listroomvalidation(requestBody:Record<string, any>) {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.string().required(),
        //@NOTE image is supposed to be array of urls
        //image: Joi.string().required(),
        hostname: Joi.string().required(),
        hostid: Joi.string().required()
        
    }
    const result = Joi.validate(requestBody, schema)
    if (result.error) {
        return result.error.details[0].message;
    } else {
        return null;
    }
    
}

export default listroomvalidation;

/**
 * {
    "title": "",
    "description": "",
    "location": "",
    "price": "",
    "images": [],
    "hostName": "",
    "hostId": "",
    "liked": false,
    "booked": false
}
 */