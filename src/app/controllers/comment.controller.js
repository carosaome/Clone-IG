import CommentModel from "../models/comments.js"

class CommentController{
    getComment(req, res){
        res.render('pagePost')
    }
    createComment(req, res){
        req.body.createdBy = req.signedCookies.Userid
        CommentModel.create(req.body)
        res.json(req.body)
    }
    
}

export default new CommentController