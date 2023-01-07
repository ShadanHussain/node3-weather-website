const request = require('request')
const forecast = (latitude,longitude,callback) => {
    setTimeout( ()=>{
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=0bfd0ee52687e52221aff1f5306a782b'
        request({url:url,json:true},(error,response) =>{
            if(error)
                callback('Unable to load weather data',undefined)
            else if(response.body.name==undefined || response.body.weather==undefined || response.body.main==undefined)
                callback('Cannot find location',undefined)
            else
                callback(undefined,{
                    name: response.body.name,
                    description: response.body.weather[0].description,
                    temp: response.body.main.temp
                })
        })
    })
}
module.exports = forecast
