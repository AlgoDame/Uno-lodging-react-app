"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const listroomvalidation_1 = __importDefault(require("../controllers/listroomvalidation"));
const multer_1 = __importDefault(require("../utils/multer"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const firebaseConfig_1 = require("../firebaseConfig");
require("dotenv").config();
console.log(process.env.API_KEY);
const router = express_1.Router();
const app = express_1.default();
router.post("/", multer_1.default, async (req, res) => {
    const file = req.files;
    console.log(typeof file);
    if (file && file.length > 0) {
        const images = file.map(async (eachFile) => {
            const result = await cloudinary_1.default.uploader.upload(eachFile.path);
            console.log("I ran second");
            return result.url;
        });
        const imageArr = await Promise.all(images);
        let allRooms = [];
        const error = listroomvalidation_1.default(req.body);
        if (!error) {
            res.json({ status: "Error", message: "i got the error here" });
            return res.status(400).end();
        }
        else {
            firebaseConfig_1.db.collection("rooms")
                .get()
                .then((resp) => {
                allRooms = resp.docs.map((room) => ({ ...room.data() }));
                let ID = allRooms.length + 1;
                const body = { ...req.body, imageArr };
                firebaseConfig_1.db.collection("rooms")
                    .doc(`${ID}`)
                    .set(body)
                    .then((resp) => {
                    res.json({ status: "Successful", message: resp });
                })
                    .catch((err) => {
                    res.json({ status: "Error", message: error });
                    return res.status(400).end();
                });
            });
        }
    }
});
exports.default = router;
