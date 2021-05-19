"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateRoomBooking(requestBody) {
    const schema = {
        hostId: joi_1.default.string().required(),
        roomId: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        phone: joi_1.default.number().required(),
        date: joi_1.default.string().required(),
    };
    const result = joi_1.default.validate(requestBody, schema);
    if (result.error) {
        return result.error.details[0].message;
    }
    else {
        return null;
    }
}
exports.default = validateRoomBooking;
