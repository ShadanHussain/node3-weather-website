const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Shadan Hussain 1' 
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Shadan Hussain 2' 
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Shadan Hussain 3'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{place_name,latitude,longitude}={})=>{
        if(error)
            return res.send({error})
        forecast(latitude,longitude,(error,{name,description,temp})=>{
            if(error)
            return res.send({error})

            return res.send({
                place_name,latitude,longitude,name,description,temp
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search item'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: '404 error',
        content: 'Help article not found',
        name: 'Shadan Hussain 4'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404 error',
        content: 'Page not found',
        name: 'Shadan Hussain 5'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})