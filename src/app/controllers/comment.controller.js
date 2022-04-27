import CommentModel from "../models/comments.js"
import UserModel from "../models/users.js"
class CommentController{
    getComment(req, res){
        res.render('pagePost')
    }
   async createComment(req, res){
        req.body.createdBy = req.signedCookies.Userid
        
        await CommentModel.create(req.body)
        const foundUser = await UserModel.findById(req.body.createdBy)
        const userAvatar = foundUser.avatar
        const userName = foundUser.username
        req.body.userAvatar = userAvatar
        req.body.userName = userName
        res.json(req.body)
    }
    
}

export default new CommentController