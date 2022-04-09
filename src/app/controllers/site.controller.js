import { networkInterfaces } from "os"
import PostModel from "../models/posts.js"
import UserModel from "../models/users.js"
class SiteController {
    async index(req, res, next) {

        
        const posts = await PostModel.find({})
           res.render('home', {posts})


    }

    async renderUserPage(req, res, next) {
        try {
            const username = req.params.username

            const foundUser = await UserModel.findOne({ username: username })
            if (foundUser) {
                const ownPosts = await PostModel.find({ createdBy: username })
                res.render('user/privatePage', { foundUser, ownPosts })
            }
            else {
                throw new Error('404 err')
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
