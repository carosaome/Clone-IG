import express from "express";
import authController from "../app/controllers/auth.controller.js";
const router = express.Router()

router.get('/',authController.login)
router.post('/', authController.checkLogin )

export default router