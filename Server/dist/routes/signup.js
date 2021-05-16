"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const firebase_1 = __importDefault(require("firebase"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.Router();
const upload = multer_1.default({ dest: 'uploads/' });
// interface Signup {
//  firstname: string,
//  lastname: string,
//  phone: number,
//  email: string,
//  password: string,
//  type: string,
//     favorites?: string[]
// }
const db = firebase_1.default.initializeApp(firebaseConfig_1.firebaseConfig).firestore();
// const storage = firebase.storage()
const uploadImage = (filename, file) => {
    const storage = firebase_1.default.storage().ref().child(filename);
    storage.put(file).then(() => console.log("uploaded file", filename)).catch(e => console.log(e));
};
router.post("/", function (req, res, next) {
    console.log("files", req.body);
    const files = req.body;
    // const newFiles: any[] = []
    // for (const [key, value] of files.entries()) {
    //    newFiles.push(key, value)
    // }
    console.log(typeof files, files);
    if (files.length < 1)
        res.status(404).end("Error");
    // uploadImage("image", req.file)
    res.status(200).json({ res: files, details: [typeof files] });
    // const result = validateSignup(req.body);
    // if (result) {
    //    return res.status(400).json({ status: "Error", message: result });
    // } else {
    //    db.collection('hosts')
    //       .add({
    //          id: 1,
    //          name: "host1"
    //       })
    //       .then((resp) => res.status(201).json({ status: "Successful", data: req.body, resp }))
    //       .catch((err) => res.status(404).json({ err }));
    // }
    // const files = await req.files;
    // console.log("body files", files)
    // files.forEach(file => {
    // const storage = firebase.storage().ref().child(file.name);
    // storage.put(file).then(() => console.log("uploaded file", file.name)).catch(e => console.log(e));
    // })
    // res.status(201).json({ body: files, message: "file uploaded successfully" })
});
exports.default = router;
