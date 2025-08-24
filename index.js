const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

const userModel = require('./models/user')
const user = require('./models/user')

app.get('/', async (req,res)=>{
    res.render('index')
})

app.get('/users', async (req,res)=>{
    const allUsers = await userModel.find()
    res.render('user',{users:allUsers})
})

app.post('/create', async(req,res)=>{
    const user = await userModel.create({
        name : req.body.name,
        email : req.body.email,
        imageURL : req.body.image
    })
    res.redirect('/users')
})

app.get('/delete/:id', async (req,res)=>{
    const deletedUser = await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/users')
})

app.get('/edit/:id', async (req,res)=>{
    const user = await userModel.findOne({_id:req.params.id})
    res.render('editpage',{userdata:user});
})

app.post('/editpage/:id', async (req,res)=>{
    const user = await userModel.findOneAndUpdate({_id:req.params.id},{
        name : req.body.name,
        email : req.body.email,
        imageURL : req.body.imageURL
    },{new:true});

    res.redirect('/users');
})

app.listen(3000)