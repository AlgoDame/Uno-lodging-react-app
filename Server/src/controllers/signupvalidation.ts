import Joi from "joi";


function validateSignup(requestBody: Record<string, any>) {
    const schema = {
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        phone: Joi.string().min(11).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required(),
        type: Joi.string().required()
    }
    const result = Joi.validate(requestBody, schema);
    if (result.error) {
        return result.error.details[0].message;
    } else {
        return null;
    }
    
}
export default validateSignup;