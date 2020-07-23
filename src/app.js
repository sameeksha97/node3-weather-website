const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port =process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sameeksha'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Sameeksha'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help Page',
        message: 'How can i help U??',
        name: 'Sameeksha'
    })
})
app.get('/weather',(req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error, foreCastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: foreCastData,
                address: req.query.address
            })
        })
    }) 

})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Sameeksha',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=> {
    res.render('404',{
        title: '404',
        name: 'Sameeksha',
        errorMessage: 'Page not found'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port,() => {
    console.log('Server is up on port '+ port)
})
