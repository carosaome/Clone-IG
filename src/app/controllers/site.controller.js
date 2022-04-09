import PostModel from "../models/posts.js"
import UserModel from "../models/users.js"
class SiteController{
    async index (req, res, next){

        PostModel.find({})
        .then((posts)=>{
            res.render('home',{posts})
        })
        .catch(next)
        

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
