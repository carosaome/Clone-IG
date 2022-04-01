import express from "express";
import SiteController from "../app/controllers/site.controller.js";
const router = express.Router()
const site = SiteController

// router.get('/:slug', site.search)
router.get('/newspage',site.news)
router.get('/search',site.search)
router.get('/',site.index)


export default router