const router = require('express').Router()
const RouteUser = require('./route-user')

router.get('/', (req , res) => {
    let message = req.session.message 
    req.session.message = null
    res.render("index",{message})
    //res.send(message)
})


router.use('/users', RouteUser)

module.exports = router