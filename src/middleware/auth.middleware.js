import users from "../app/models/users.js"

function requireAuth(req, res, next){
    if(!req.signedCookies.Userid){
        res.redirect('/login')
        return
    }
    let user = users.findById(req.signedCookies.Userid)
    res.locals.Userid = user._id    
    
    if(!user){
        res.redirect('/login')
        return
    }
    next()
}

export default requireAuth