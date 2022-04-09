import express from "express"
import SiteController from "../app/controllers/site.controller.js"
import requireAuth from "../middleware/auth.middleware.js"
const router = express.Router()
const site = SiteController
router.get('/user',requireAuth,site.getUserName)
router.get('/:username',requireAuth,site.renderUserPage)
router.get('/',requireAuth ,site.index)


export default router