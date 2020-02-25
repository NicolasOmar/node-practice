const request = require('request')
const {msg} = require('./utils.js')

const secretKey = 'cdacfaddf1d7dfedeb68a470bd6dee1e'
const options = {
    url: `https://api.darksky.net/forecast/${secretKey}/37.8267,-122.4233`,
    json: true, // TO RETURN BODY RESPONSE INTO JSON
    units: 'si'
}

request.get(
    options,
    (error, response) => {
        const {temperature, precipProbability} = response.body.currently
        const dailyData = response.body.daily.data
        msg.warning(`It is currently ${temperature}° out. There is a ${precipProbability}% change of rain. Today´s summary is ${dailyData[0].summary}`)
    }
)