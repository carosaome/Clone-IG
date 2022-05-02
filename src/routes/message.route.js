import express from "express";
import messageController from "../app/controllers/message.controller.js";
const router = express.Router()

router.get('/',messageController.renderPage)
router.post('/', messageController.renderConverstation)
router.post('/sendMessage', messageController.sendMessage)

export default router