import express from "express";
import messageController from "../app/controllers/message.controller.js";
const router = express.Router()

router.get('/',messageController.renderPage)
router.get('/:guestId',messageController.renderBoxChat)
router.post('/', messageController.renderConverstation)
router.post('/sendMessage', messageController.sendMessage)

export default router