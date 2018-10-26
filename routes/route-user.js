const route = require('express').Router()
const {query, postSingUp,confrim_status,postLogin,like,unlike,toProfile,
    logOut
} = require('../controllers/controller-user')

const Helper = require('../helper/helper')

route.post('/sign-up', postSingUp)
route.get('/logout', logOut)
route.get('/query',query)
route.get('/confrim-register/:idUser',confrim_status)
route.post('/log-in', postLogin)
route.get('/like/:idQoute', like)
route.get('/unlike/:idQoute', unlike)
route.get('/profile',Helper.cekLogin ,toProfile)

module.exports = route