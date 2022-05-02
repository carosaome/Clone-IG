import PostModel from "../models/posts.js"
import UserModel from "../models/users.js"
import CommentModel from "../models/comments.js"
class PostController{
    getPost(req, res){
        res.render('pagePost')
    }

    async getPostById(req, res, next){
      try {
        const postId        = req.params.postId
        const foundPost     = await PostModel.findById(postId)
                                             .populate('createdBy', 'username avatar') 
        const foundComments = await CommentModel.find({postId:postId})
                                                .populate('createdBy', 'username avatar')

        res.render('postDetail', {foundComments, foundPost})
      } catch (error) {
          next(error)
      }
    }
   async createPost(req, res){
        req.body.imgUrl    = res.locals.imgUrl
        req.body.createdBy = req.signedCookies.Userid
        PostModel.create(req.body)
        res.redirect('/post')
    }
    
}

export default new PostController