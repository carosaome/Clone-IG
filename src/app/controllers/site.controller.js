import Course from "../models/course.js"
class SiteController{
    index(req, res, next){

        Course.find({})
        .then((courses)=>{
            res.render('home',{courses})
        })
        .catch(next)
        
        // res.render('home')

    }
    search(req, res){
        
        res.render('search')
    }
    news(req,res){
        console.log(req.cookies);

        res.render('newspage')
    }

}
export default new SiteController
