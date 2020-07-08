const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const weatherDetails = require('./utils/weatherdetails');

//Path for dynamic templates(templates) and static files(public)
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

//Fetch the PORT number for running app in HEROKU in case of local default value is 3000.
const port = process.env.PORT || 3000;

//express configs to server static content
const app = express();


//handler bar configs - view engine as 'hbs', 'views' to customize dir 'tempaltes'
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Balakumar Seethapathy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Balakumar Seethapathy'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help - Contact Us',
        name: 'Balakumar Seethapathy'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            errorMessage: 'Address should be provided!!'
        });    
    }
    console.log(req.query.address);
    

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
        if (error === undefined) {
            //const JSONWeatherCoordinates = JSON.parse(responseData);
            //var latitude = JSONWeatherCoordinates.latitude;
            //var longitude = JSONWeatherCoordinates.longitude;
            weatherDetails(latitude, longitude, location, (error, weatherResponseData) => {
                if (error === undefined) {
                    res.send({
                        weather: weatherResponseData.data,
                        location: weatherResponseData.location,
                        address: req.query.address
                    });    
                } else {
                    res.send({
                        errorMessage: error                        
                    });
                }
                
            });
        } else {
            res.send({
                errorMessage: error                        
            });
        }
    })
});

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: '',
        name: 'Balakumar Seethapathy',
        errorMessage: 'Help Page Not Found'
    });
});

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: '',
        name: 'Balakumar Seethapathy',
        errorMessage: 'Page Not Found'
    });
});

app.listen(3000, () => {
    console.log("Node JS Web Server is up and running in port 3000");
});