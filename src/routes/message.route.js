import express from "express";
import messageController from "../app/controllers/message.controller.js";
const router = express.Router()

router.get('/',messageController.renderPage)

export default router