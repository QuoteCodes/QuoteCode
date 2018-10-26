const express = require('express')
const app = express()
const PORT = 3000
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(session({ secret : 'keyboard cat', resave: false, saveUninitialized:false}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
    res.locals.user = req.session.user
    // res.locals.user = 'adaloh'
    next()
})

const route = require('./routes/index')
app.use(route)



app.listen(PORT,() => {
    console.log("Listening to PORT : ", PORT)
})