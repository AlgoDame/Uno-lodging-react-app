import Joi from 'joi';

function validateLogin(requestBody:Record<string, any>) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    const result = Joi.validate(requestBody, schema);
    if (result.error) {
        return result.error.details[0].message;
    } else {
        return null;
    }
}

export default validateLogin;