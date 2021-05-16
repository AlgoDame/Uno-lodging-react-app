"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.firebaseConfig = void 0;
const firebase_1 = __importDefault(require("firebase"));
exports.firebaseConfig = {
    apiKey: "AIzaSyB48F0O_PO6X6snptL783sNn7iDt8Z28RY",
    authDomain: "unolodging-44544.firebaseapp.com",
    databaseURL: "https://unolodging-44544-default-rtdb.firebaseio.com",
    projectId: "unolodging-44544",
    storageBucket: "unolodging-44544.appspot.com",
    messagingSenderId: "905250367175",
    appId: "1:905250367175:web:9dde81ad29f7b0df9e00e2",
};
exports.db = firebase_1.default.initializeApp(exports.firebaseConfig).firestore();
