require('dotenv').config();

const cloudinary = require("cloudinary").v2;
// console.log("cloudinary", process.env.API_KEY)

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default cloudinary