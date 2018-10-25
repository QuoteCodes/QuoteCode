const express = require('express')
const app = express()
const port = 1111
// const router = require('./routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render("inUser")
})
app.get('/f',(req,res)=>{
    res.render("index", {error:null})
})

app.listen(port,function(){
    console.log(`live on port ${port}`)
})


