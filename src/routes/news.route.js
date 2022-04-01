import express from "express";
import NewsPage from "../app/controllers/news.controller.js";
const router = express.Router()
const newsPage = NewsPage

router.get('/:slug', newsPage.show)
router.get('/',newsPage.index)


export default router