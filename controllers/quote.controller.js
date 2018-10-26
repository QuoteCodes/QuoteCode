const model = require('../models')

module.exports = {
    createQuote: (req, res) => {
        model.Quote.create({
            description: req.body.description
        })
        .then(c => {
            model.UserQuote.create({
                UserId: req.session.user.id,
                QuoteId: c.id
            })
            .then(result => {
                res.redirect('/')
            })
        })
    },

    index: (req, res) => {
        model.UserQuote.findAll({
            include : [{
                model : model.User,
            }, {
                model : model.Quote,
            }],
            order: [['createdAt', 'DESC']]
        })
        .then(data=>{
            // res.json(data)
            res.render('index', {data})
        })
    }
}