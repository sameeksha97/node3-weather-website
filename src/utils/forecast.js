const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3ebc47e019699758141416b616a9eddf&query='+longitude+','+latitude+'&units=f'
    request({url, json: true},(error, {body}={}) => {
        if(error) {
            callback('Unable to connect weather services',undefined)
        }else if (body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+'. iIt is currently '+ body.current.temperature + ' degrees out .feels like '+ body.current.feelslike +' degrees out.')
        }
    })
}

module.exports = forecast