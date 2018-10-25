const {User, User_Qoute} = require('../models/index')
const sgMail = require('@sendgrid/mail')
const Helper = require('../helper/helper')
const keyemail = require('../config/key')

module.exports = {
    toSignUp : (req, res)=>{
        let error = req.session.error
        req.session.error = null
        res.render("form-register", {error})
        // res.send("Open form daftar dengan error null")
    },
    postSingUp : (req,res)=>{
        let first_name = req.body.first_name
        let last_name = req.body.last_name
        let gender = req.body.gender
        let email = req.body.email
        let salt = Helper.genSalt()
        let password = Helper.hashing(req.body.password,salt)

        let newUserObj = {first_name, last_name, gender, email, password, salt}

        User.create(newUserObj)
            .then( newUser => {
               
                //send email
              sgMail.setApiKey(keyemail)
                const msg = {
                    to: email,
                    from: 'ekomasukkpak@gmail.com',
                    subject: 'One Step Active Your Email',
                    text: 'Thanks to Join ',
                    html: `<p>Hello, ${first_name}, your actived link <a href='http://localhost:3000/users/confirm-register/${newUser.id}'> Actived Link </a>' </p>`,
                }
              sgMail.send(msg)
              
              req.session.message = 'Link Actived Your Account has been sent, please check your email'
              res.redirect('/')
            })
            .catch( err =>{
                res.status(400).send("Error while create new user")
            })
    },

    confrim_status : (req, res)=>{
        let userId = req.params.idUser
        res.send(userId)

        // User.findById(userId)
        //     .then( user =>{
        //         user.confrim_status = true
        //         return user.save()
        //     })
        //     .then ( succes_confrim =>{
        //         res.redirect('/user/log-in')
        //     })
        //     .catch(err =>{
        //         res.status(400).send('error while confrim registered/save')
        //     })
    },

    toLogin : (req, res) => {
        let error = req.session.error
        req.session.error = null
        //res.render("login-form", {error})
        res.send('open form login with error null')

    },

    postLogin : (req, res)=>{

        let password = req.body.password
        let email = req.body.email
        User.findOne({ where : {
            email : email
        }})
            .then( user =>{
                if(user){
                    let passwordChecked = Helper.compare(password,user.password)
                    if(passwordChecked){
                        req.session.user = user
                    }else{
                        req.session.error = 'Password Salah!'
                        res.send('Password anda salah!')
                        //res.redirect('/log-in')  
                    }
                }else{
                    req.session.error = 'Email tidak terdaftar!'
                    res.send('Email anda tidak terdaftar!')
                        //res.redirect('/log-in')  
                }
               
            }) 
            .catch( err => {
                res.status(400).send('Error while login')
            })
    },

    like : (req, res)=>{
        let qouteId = req.params.iqQoute
        let userId = req.session.user.id
        User_Qoute.findOrCreate(
            {
                where : {
                    QouteId : qouteId,
                    UserId : userId,
                }, defaults :{
                    like : true,
                    unlike : false
                } 
            })
        .spread( (qouteData, findInformation) =>{
            if(!findInformation){
                qouteData[0].save()
                    .then( succesUpdated =>{
                        res.send('testing like')
                        //res.redirect('/')
                    })
                    .catch( err =>{
                        res.send('Error while like')
                    })
            }else{
                res.send('Like')
                res.redirect('/')
            }
        })
        
    },

    unlike : (req, res)=>{
        let qouteId = req.params.iqQoute
        let userId = req.session.user.id
        User_Qoute.findOrCreate(
            {
                where : {
                    QouteId : qouteId,
                    UserId : userId,
                }, defaults :{
                    like : false,
                    unlike : true
                } 
            })
        .spread( (qouteData, findInformation) =>{
            if(!findInformation){
                qouteData[0].save()
                    .then( succesUpdated =>{
                        res.send('testing like')
                        //res.redirect('/')
                    })
                    .catch( err =>{
                        res.send('Error while like')
                    })
            }else{
                res.send('Like')
                res.redirect('/')
            }
        })
        
    },

    toProfile : (req, res)=>{
        let user = req.session.user
        res.render('profil form', {user})
    }

}