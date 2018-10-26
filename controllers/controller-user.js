const model = require('../models/index')
const sgMail = require('@sendgrid/mail')
const Helper = require('../helper/helper')
const keyemail = require('../config/key')

module.exports = {
    postSingUp : (req,res)=>{
        let first_name = req.body.first_name
        let last_name = req.body.last_name
        let gender = req.body.gender
        let email = req.body.email
        let salt = Helper.genSalt()
        let password = Helper.hashing(req.body.password,salt)

        let newUserObj = {first_name, last_name, gender, email, password}
        
        model.User.create(newUserObj,{individualHooks:true})
            .then( newUser => {
             //send email
              sgMail.setApiKey(keyemail)
                const msg = {
                    to: email,
                    from: 'ekomasukkpak@gmail.com',
                    subject: 'One Step Active Your Email',
                    text: 'Thanks to Join ',
                    html: `<p>Hello, ${first_name}, your actived link <a href='http://localhost:3000/users/confirm-register/'> Actived Link </a>' </p>`
                }
              sgMail.send(msg)
              
              req.session.message = 'Link Actived Your Account has been sent, please check your email'
              res.redirect('/')
            })
            .catch( err =>{
                res.send(err.message)
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

    logOut: (req, res) => {
        req.session.user = null
        res.redirect('/')
    },


    postLogin : (req, res)=>{
        let password = req.body.password
        let email = req.body.email
        model.User.findOne({ where : {
            email : email
        }})
            .then( user =>{
                
                if(user){
                    let passwordChecked = Helper.compare(password, user.password)
                    if(passwordChecked){
                        req.session.user = {
                            id : user.id,
                            first_name : user.first_name,
                            last_name : user.last_name,
                            email : user.email,
                            role : user.role
                        }
                        res.redirect('/')
                    }
                }else{
                    req.session.error = 'Email tidak terdaftar!'
                    res.send('Email anda tidak terdaftar!')
                    res.redirect('/') 
                }
               
            }) 
            .catch( err => {
                res.status(400).send('Error while login')
            })
    },

    like : (req, res)=>{
        let qouteId = req.params.iqQoute
        let userId = req.session.user.id
        model.UserQoute.findOrCreate(
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
        model.UserQoute.findOrCreate(
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
        // console.log(user)
        res.render('profile', {user})
    },

    query : (req, res)=>{
        model.User.findAll({
            include : [{
                model : model.Quote
            }]
        })
        .then(data=>{
            res.send(data)
        })
    }

}