import express from "express";
import coursesController from "../app/controllers/courses.controller.js";
import requireAuth from "../middleware/auth.middleware.js";
const router = express.Router()
router.param('slug', function (req, res, next, id) {
    
    console.log(req.params)
    
    next()
  })
router.get('/create',requireAuth, coursesController.create)
router.post('/store',coursesController.store)
router.get('/:slug',coursesController.show)
router.get('/',(req,res)=>{
    res.send('Courses')

})
export default router