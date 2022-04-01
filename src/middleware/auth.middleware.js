import users from "../app/models/users.js"

function requireAuth(req, res, next){
    console.log();
    console.log(req.signedCookies.Userid);
    if(!req.cookies.Userid){
        res.redirect('/login')
        return
    }
    let user = users.find({email: req.signedCookies.Userid})

    if(!user){
        res.redirect('/login')
        return
    }
    next()
}

export default requireAuth