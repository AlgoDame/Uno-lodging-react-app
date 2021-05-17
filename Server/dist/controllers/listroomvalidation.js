"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateRoomListing(requestBody) {
    const schema = {
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        location: joi_1.default.string().required(),
        price: joi_1.default.string().required(),
        //@NOTE image is supposed to be array of urls
        //image: Joi.string().required(),
        hostname: joi_1.default.string().required(),
        hostid: joi_1.default.string().required()
    };
    const result = joi_1.default.validate(requestBody, schema);
    if (result.error) {
        return result.error.details[0].message;
    }
    else {
        return null;
    }
}
exports.default = validateRoomListing;
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
