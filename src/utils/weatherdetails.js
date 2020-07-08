const request = require('request');

const weatherUrl = 'http://api.weatherstack.com/current?access_key=5e80e3e409497ac9fc4573961d0bd071&query=LONGITUDE,LATITUDE&units=f';

const getWeatherDetails = (latitude, longitude, location, callback) => {
    const url = weatherUrl.replace('LATITUDE', latitude).replace('LONGITUDE', longitude);
    console.log('Weather Url: ', url);
    setTimeout (() => {
        request({url, json: true}, (error, { body }) => {
            if (error) {                
                callback('Not able to connect to Weather Appliation!!', undefined);
            } else if (body.error) {                
                callback('Error : ' + body.error, undefined);
            } else {                
                const currentTemp = body.current.temperature;
                const precipitationProbability = body.current.feelslike;
                const weatherData = body.current.weather_descriptions;
                const locationSpecifics = body.location.name;
                const printData = 'It is currently ' + currentTemp + ' degrees.' 
                + ' But feels like ' + precipitationProbability + ' degrees out there.'
                + ' Weather is ' + weatherData[0];

                const weatherDataResponse = {
                    data: printData,
                    location: location + ' , ' + locationSpecifics
                };

                callback(undefined, weatherDataResponse);
            }
        });
    }, 0);
}

module.exports = getWeatherDetails