const request = require('request')
const geocode = (address,callback) => {
    setTimeout( ()=>{
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hhZGFuaHVzc2FpbiIsImEiOiJjbGFuaXR0aGIwM2FwM3duenV4MmxtY3YzIn0.q3iFfCEK9ifT_fcaMPFK6w'
        request({url:url,json:true},(error,response) =>{
            if(error)
                callback('Unable to load weather data',undefined)
            else if(response.body.features.length==0)
                callback('Cannot find location',undefined)
            else
                callback(undefined,{
                    place_name: response.body.features[0].place_name,
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0]
                })
        })
    })
}

module.exports = geocode