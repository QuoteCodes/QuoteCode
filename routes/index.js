const router = require('express').Router()
const RouteUser = require('./route-user')
const Quote = require('./quote.routes')
const {index} = require('../controllers/quote.controller')

router.get('/', index)


router.use('/users', RouteUser)
router.use('/quotes', Quote)

module.exports = router