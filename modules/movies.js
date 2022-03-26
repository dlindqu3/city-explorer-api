'use strict'; 

const axios = require('axios'); 

let cache = require('./cache.js');


async function getMovies(request, response){
  try {
    let cityName = request.query.cityName; 
    
    
    // if (cache)

  let url3 = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}`;
  console.log(url3); 
  let moviesQueryData = await axios.get(url3); 

  let cityMovie = moviesQueryData.data.results.map((film) =>{
    return new Movie(film);
  });
  response.send(cityMovie);
  } catch (error){
    console.log(error)
  }
}

class Movie {
  constructor (obj){
    this.title = obj.title; 
  }
}

module.exports = getMovies; 