"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateLogin(requestBody) {
    const schema = {
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        type: joi_1.default.any().optional(),
    };
    const result = joi_1.default.validate(requestBody, schema);
    if (result.error) {
        return result.error.details[0].message;
    }
    else {
        return null;
    }
}
exports.default = validateLogin;
