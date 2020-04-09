const path=require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); 

//define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shree'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shree'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!!',
        msg: 'Welcome to help page',
        name:'Shree'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide address for weather'
        })
    } else {
 
    geocode(req.query.address, (error,data) => {
        if (error) {
            res.send({error: error}); 
        } else {
         forecast(data.latitude,data.longitude , (error, data1) => {
             if (error) {
                   res.send({error: error}); 
             } else {
                res.send({
                    description: data1.weather_description,
                    temperature: data1.temperature,
                    location: data1.location
                })
             }
        })};
    
    });
}
});

app.get('*', (req,res) => {
    res.send('My 404 page');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});