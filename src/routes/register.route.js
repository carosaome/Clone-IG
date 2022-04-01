import express from "express";
import authController from "../app/controllers/auth.controller.js";
const router = express.Router()

router.get('/',authController.register)

router.post('/', authController.check,authController.createUser)

export default router