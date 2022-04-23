import { networkInterfaces } from "os"
import PostModel from "../models/posts.js"
import UserModel from "../models/users.js"
import CommentModel from "../models/comments.js"
class SiteController {
    async index(req, res, next) {
        const offset = req.query.offset
        const loadPosts = (Number(offset) - 1) * 2        
        const posts = await PostModel.find({})
                                .populate('createdBy', 'username avatar')
                                .skip(0)
                                .limit(2)
           res.render('home', {posts})


    }
    async loadPost(req, res, next) {
        const offset = req.query.offset
        const loadPosts = (Number(offset) - 1) * 2        
        const posts = await PostModel.find({})
                                .populate('createdBy', 'username avatar')
                                .skip(loadPosts)
                                .limit(2)
                                // res.render('home', {posts})
           res.json(posts)


    }
    async renderPostDetail(req, res, next){
        const postId = req.params
        const comments = await CommentModel.find({postId})
        res.render('postDetail', {comments})
    }

    async renderUserPage(req, res, next) {
        try {
            const username = req.params.username

            const foundUser = await UserModel.findOne({ username: username })
            if (foundUser) {
                const ownPosts = await PostModel.find({ createdBy: foundUser._id })
                res.render('user/privatePage', { foundUser, ownPosts })
            }
            else {
                throw new Error('404 user not found')
            }
        } catch (error) {
            next(error)
        }

    }

    async getUserName(req, res, next){
      try {
          
        const foundUser = await UserModel.findById(req.signedCookies.Userid)
        res.json(foundUser)
        
      } catch (error) {
          next(error)
      }

    }
}
export default new SiteController
