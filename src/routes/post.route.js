import express from "express";
import postController from "../app/controllers/post.controller.js";
import multer from "multer";
const router = express.Router()
const upload = multer({dest: 'src/public/uploads/'})

router.get('/',postController.getPost)
router.post('/', upload.single('imgUrl'), postController.createPost )

export default router