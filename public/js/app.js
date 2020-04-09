console.log('Client side javascript file is loaded!');

fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log('error:' + data.error);
        } else {
            console.log('weather_description:' + data.weather_description);
            console.log('temperature:' + data.temperature);
            console.log('location:' + data.location);
        }
    })
})

const weatherForm = document.querySelector('form');

const search = document.querySelector('input');
const temperature = document.querySelector('#temperature');
const weather_description = document.querySelector('#weather_description');
const locationRegion = document.querySelector('#location');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('form submitted');
    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location;

    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            temperature.textContent = 'Error: ' + data.error;
        } else {
            console.log('weather_description:' + data.weather_description);
            console.log('temperature:' + data.temperature);
            console.log('location:' + data.location);
            temperature.textContent = 'Temperature: ' + data.temperature;
            weather_description.textContent = 'Weather Description: ' + data.weather_description;
            locationRegion.textContent = 'Location: ' + data.location;
        }
    })
})
    
});