import site  from "./site.route.js"
import login from"./login.route.js"
import register from"./register.route.js"
import post from "./post.route.js"
import comment from "./comment.route.js"
import requireAuth from "../middleware/auth.middleware.js"
function route(app){
    app.use('/login',login)
    app.use('/register',register)
    app.use('/post', requireAuth ,post)
    app.use('/api/comments', comment)
    app.use('/', site)
}

export {route} 