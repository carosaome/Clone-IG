import express from "express";
import CommentController from "../app/controllers/comment.controller.js";
const router = express.Router()

router.get('/',CommentController.getComment)
router.post('/', CommentController.createComment )

export default router