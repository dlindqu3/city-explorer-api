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
const res = require('express/lib/response');

// USE
// Once we have required something, we have to use it. This is where we assigne the required field a variable. React does this in one step with "import." express takes 2 steps: 'require" and 'use.'
const app = express();
app.use(cors());


// define PORT and validate that my .env file is working
const PORT = process.env.PORT || 3002;
// if my server is running on 3002, I know ssomething is wrong with my .env file or how I'm importing the values from it.

// ROUTES
// We will write our endpoints here
// app.get() correlates to axios.get
app.get('/', (request, response) => {
  response.send('hello, from our server!');
  // console.log(weatherData);
});


//here, weather is the endpoint 
app.get('/weather', async (request, response) => {
  // let searchQuery = request.query; 
  let lat = request.query.lat;
  //atl lat: 33.749
  let lon = request.query.lon; 
  //atl lon: -84.38798 

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`

  let queryData = await axios.get(url);

  //the first data is for the axios request, the second is nested within response
  let cityWeatherArray = queryData.data.data.map((day) =>{
    return new Forecast(day);
  });
  // console.log(cityWeatherArray); 

  response.send(cityWeatherArray); 
})


app.get('/movies', async (request, response) => {
  let cityName = request.query.cityName; 
  let url3 = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}`;
  console.log(url3); 
  let moviesQueryData = await axios.get(url3); 

  let cityMovie = moviesQueryData.data.results.map((film) =>{
    return new Movie(film);
  });
  response.send(cityMovie); 
})


class Movie {
  constructor (obj){
    this.title = obj.title; 
  }
}


//Class - Forecast 
class Forecast {
  constructor(Obj) {
    this.date = Obj.valid_date;
    this.description= Obj.weather.description;
  }
}


// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));