import PostModel from "../models/posts.js"
import UserModel from "../models/users.js"
class PostController{
    getPost(req, res){
        res.render('pagePost')
    }
   async createPost(req, res){
        req.body.imgUrl = res.locals.imgUrl
        const foundUser = await UserModel.findById(req.signedCookies.Userid)
        req.body.createdBy = foundUser.username
        PostModel.create(req.body)
        res.redirect('/post')
    }
    
}

export default new PostController