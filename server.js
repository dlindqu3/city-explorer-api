'use strict';

console.log('Our first server');

// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for server
const express = require('express');
require('dotenv').config();
const axios = require('axios'); 
const weatherData = require('./data/weather.json'); 
// we must include cors if we want to share resources over the web
const cors = require('cors');
const response = require('express/lib/response');
const getWeather = require('./weather.js'); 
const getMovies = require('./movies.js'); 

// USE
// Once we have required something, we have to use it. This is where we assigne the required field a variable. React does this in one step with "import." express takes 2 steps: 'require" and 'use.'
const app = express();
app.use(cors());


// define PORT and validate that my .env file is working
const PORT = process.env.PORT || 3002;
// if my server is running on 3002, I know ssomething is wrong with my .env file or how I'm importing the values from it.

// ROUTES
// app.get() correlates to axios.get
app.get('/', (request, response) => {
  response.send('hello, from our server!');
  // console.log(weatherData);
});


//here, weather is the endpoint 
app.get('/weather', getWeather);


app.get('/movies', getMovies);


// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));