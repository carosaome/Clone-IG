import users from "../models/users.js";
class AuthController {
    login(req, res) {
        res.render('auth/login')
    }
    register(req, res) {
        res.render('auth/register')
    }

    check(req, res, next) {
        let err = []
        if (!req.body.username) {
            err.push('Email is required')
        }
        if (!req.body.password) {
            err.push('Pass is required')
        }

        if (err.length) {
            res.render('auth/login', err)
            return
        }
        next()
    }
    createUser(req, res) {

        users.find({ username: req.body.username })
            .then((user) => {
                if (user.length) {
                    res.send('user exist')
                }
                else {
                    users.create(req.body)
                    res.redirect('/login')
                }
            })
    }

    checkLogin(req, res) {
        users.find({ username: req.body.username })
            .then((user) => {


                if (user[0].password === req.body.password) {

                    res.cookie('Userid', user[0]._id, {
                        signed: true
                    })
                    res.redirect('/')
                }
                else {

                    res.send('Login fail')

                }
            })
    }
}

export default new AuthController