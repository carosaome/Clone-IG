import express from "express";
import postController from "../app/controllers/post.controller.js";
import multer from "multer";
import { uploadToCloud } from "../app/controllers/upload.controller.js";
const router = express.Router()

  const memoryStorage = multer.memoryStorage()
  const uploadWithMemoryStorage = multer({ storage: memoryStorage })
const upload = multer({dest: 'src/public/uploads/'})

router.get('/:postId', postController.getPostById)
router.get('/',postController.getPost)
router.post('/', uploadWithMemoryStorage.single('imgUrl'), uploadToCloud, postController.createPost )
router.post('/cloud', upload.single('imgUrl'), postController.createPost )
export default router

