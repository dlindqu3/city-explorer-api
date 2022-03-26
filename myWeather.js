'use strict'; 

const axios = require('axios'); 

async function getWeather(request, response){
  try {
    let lat = request.query.lat;
    //atl lat: 33.749
    let lon = request.query.lon; 
    //atl lon: -84.38798 
  
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
  
    // console.log(url); 

    let queryData = await axios.get(url);
  
    //the first data is for the axios request, the second is nested within response
    let cityWeatherArray = queryData.data.data.map((day) =>{
      return new Forecast(day);
    });
    // console.log(cityWeatherArray); 
  
    response.send(cityWeatherArray);

  } catch (error){
    console.log(error); 
  }
}


//Class - Forecast 
class Forecast {
  constructor(Obj) {
    this.date = Obj.valid_date;
    this.description= Obj.weather.description;
  }
}

module.exports = getWeather; 