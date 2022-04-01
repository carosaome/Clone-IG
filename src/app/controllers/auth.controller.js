import users from "../models/users.js";

class AuthController{
    login(req, res){
        res.render('auth/login')
    }
    register(req, res){
        res.render('auth/register')
    }

    check(req, res, next){
        let err = []
        if(!req.body.email){
            err.push('Email is required')
        }
        if(!req.body.password){
            err.push('Pass is required')
        }
      
        if(err.length){
            res.render('auth/login', err)
            return
        }
        next()
    }
    createUser(req, res){

        users.find({email: req.body.email})
        .then((user)=>{
            if(user.length){
               console.log('user exist')
               res.send('user exist')
            }
            else{
             const user = new users(req.body)
             user.save()
                res.redirect('/login')
            }
        })
    }

    checkLogin(req, res){
        users.find({email: req.body.email})
        .then((user)=>{

           
            if(user[0].password === req.body.password){
               
                res.cookie('Userid', user[0].email,{
                    signed: true
                })
                res.redirect('/')
            //    res.send('Login sucess')
            }
            else{
             
                res.send('Login fail')

            }
        })
    }
}

export default new AuthController