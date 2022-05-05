
import UserModel from "../models/users.js"
import ConverstationModel from "../models/converstations.js"
import MessageModel from "../models/messages.js"
class MessageController{

    async renderPage(req, res){
        const userId = req.signedCookies.Userid
        const userActive = await UserModel.find({ _id: { $ne: userId } })

        res.render('messagePageActiveUser', {userActive})
    }
    async renderBoxChat(req, res){
        const userId = req.signedCookies.Userid
        const {guestId} = req.params
        const userActive = await UserModel.find({ _id: { $ne: userId } })
        const foundCon = await ConverstationModel.findOne({
            member:{ 
                $all:[userId, guestId]
            }}).populate('member', 'username avatar')
        if(foundCon){
            const foundConId = foundCon._id
            const foundMessages = await MessageModel.find({
                        converstationId : foundConId
            })
            const foundGuest = await UserModel.findById(guestId)
            console.log(foundGuest);
            res.render('messagePage', {foundConId, foundMessages, userActive, foundGuest})
            return
        }
        else{
            ConverstationModel.create({
                member: [userId, guestId]
            })
            res.send('sucess')
        }            
        // res.render('messagePage', {userActive})
    }
    async renderConverstation(req, res){
        const userId = req.signedCookies.Userid
        const guestId = req.body.guestId

        const foundCon = await ConverstationModel.findOne({
                        member:{ 
                            $all:[userId, guestId]
                        }}).populate('member', 'username avatar')
       
        const foundGuest = await UserModel.findById(guestId)
        if(foundCon){
            const foundConId = foundCon._id
            const foundMessages = await MessageModel.find({
                        converstationId : foundConId
            })
            res.json({foundMessages, foundGuest, foundCon})

        }
        else{
            ConverstationModel.create({
                member: [userId, guestId]
            })
            res.send('sucess')
        }                
    }
    
    async sendMessage(req, res) {
        const userId = req.signedCookies.Userid
        const {content, converstationId} = req.body

        const messageData = {
                converstationId,
                content, 
                createdBy:userId
            }
        
        await MessageModel.create(messageData)
        res.json(messageData)

    }
}
export default new MessageController