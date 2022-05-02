import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import dotenv from "dotenv"
dotenv.config({path:'.env'})

const uploadToDisk = (req, res) => {

  res.send({ success: 1, data: req.file.originalname })
}
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  secure: true,
})

const uploadToCloud = async (req, res, next) => {
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};
  
  const result = await streamUpload(req);
  res.locals.imgUrl = result.secure_url
  next()
}
export {uploadToDisk, uploadToCloud}
