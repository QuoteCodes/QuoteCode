const route = require('express').Router()
const {toSignUp,postSingUp,confrim_status,toLogin,postLogin,like,unlike,toProfile} = require('../controllers/controller-user')

route.get('/sign-up',toSignUp)
route.post('/sign-up', postSingUp)

route.get('/confrim-register/:idUser',confrim_status)

route.get('/log-in',toLogin)
route.post('/log-in', postLogin)
route.get('/like/:idQoute', like)
route.get('/unlike/:idQoute', unlike)
route.get('/profile',toProfile)

module.exports = route