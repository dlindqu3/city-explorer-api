'use strict';

console.log('Our first server');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const cache = require('./modules/cache.js')

const weather = require('./modules/weather.js');
console.log(weather); 
const app = express();

const PORT = process.env.PORT || 3003;

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  // const { latitude, longitude } = request.query;
  const latitude = request.query.lat; 
  const longitude = request.query.lon; 
  console.log('request.query: ', request.query); 
  weather.getWeather(latitude, longitude)
  .then(summaries => {
    console.log('cache: ', cache);
    response.send(summaries);
  })
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(PORT, () => console.log(`Server up on ${PORT}`));