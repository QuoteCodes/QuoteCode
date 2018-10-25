const express = require('express')
const app = express()
const PORT = 3000
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(session({ secret : 'keyboard cat', resave: false, saveUninitialized:false}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())



//app routes
const route = require('./routes/index')
app.use(route)



app.listen(PORT,() => {
    console.log("Listening to PORT : ", PORT)
})