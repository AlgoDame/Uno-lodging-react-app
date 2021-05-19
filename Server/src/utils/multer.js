"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const multer_1 = __importDefault(require("multer"));
module.exports = multer_1.default({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted
        if (!file.mimetype.match(/png||jpeg||jpg||gif/)) {
            cb(new Error('I don\'t have a clue!'));
        }
        // To reject this file pass `false`, like so:
        cb(null, false);
        // To accept the file pass `true`, like so:
        cb(null, true);
        // You can always pass an error if something goes wrong:
    }
});
