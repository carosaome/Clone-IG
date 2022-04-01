import newsPage from "./news.route.js"
import site  from "./site.route.js"
import courses from "./courses.route.js"
import login from"./login.route.js"
import register from"./register.route.js"
import requireAuth from "../middleware/auth.middleware.js"

function route(app){
    app.use('/newspage',requireAuth,newsPage)
    app.use('/courses',requireAuth,courses)
    app.use('/login',login)
    app.use('/register',register)
    app.use('/',site)
}

export {route} 