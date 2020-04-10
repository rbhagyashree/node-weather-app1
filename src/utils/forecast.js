const request = require('postman-request');

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f19d9c0779ced6d421e32aaef12c6946&query=' + lat + ',' + long;

    request({url: url, json: true},(error,response) => {

        if (error) {
            callback('Unable to forecast weather for specified latitude and longitude!', undefined);
        } else if (response.body.current.weather_descriptions.length === 0) {
            callback('Unable to find specified location. Try another search.', undefined)
        } else {
            //callback('here are the results', undefined);
            callback(undefined, {
                weather_description: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                location: response.body.location.name + ', ' + response.body.location.region,
                humidity: response.body.current.humidity,
                feelslike: response.body.current.feelslike
            })
        }
    }); 
}

module.exports = forecast;