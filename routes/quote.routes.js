const route = require('express').Router()
const { createQuote
} = require('../controllers/quote.controller')

route.post('/', createQuote)

module.exports = route