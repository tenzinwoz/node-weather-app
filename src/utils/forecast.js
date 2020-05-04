const request = require('request');

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=250a1670e69c18d6ce7a503982dfa058&query='+ lat +','+ long +'&units=f'
   request({ url, json:true }, (error, { body }) => {
        if(error){
          callback('Unable to connect to weather api', undefined);
        }
        else if(body.error){
          callback('Unable to find the location', undefined);
        }
        else{
          console.log()
           callback(undefined, `It is ${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degrees out and there is ${body.current.precip} % chance of rain with humidity of ${body.current.humidity}`)
        }
   })
}

module.exports = forecast;