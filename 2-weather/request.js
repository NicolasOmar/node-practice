const request = require('request')
const {msg} = require('./utils.js')
const config = require('./config.js')

// CALL PATTERN: RETURN FUNCTION TO REDUCE CODE AND MANTAIN EACH SPECIFIC RESPONSE
const makeRequest = (config, callback) => {
	request.get(
		config,
		(error, response) => error ? msg.fail('Unable to connect.') : callback(response)
	)
}

const getLocationAndWeather = (address) => {
	makeRequest(
    config.getLocationByAddress(address),
    (response) => {
      if (response.body.features && response.body.features.length) {
        const {place_name, center} = response.body.features[0] // KNOWING THE JSON STRUCTURE, I CAN DECONSTRUCT THE RESPONSE OBJECT INTO THE PROPERTIES I NEED
        msg.success(`${place_name} is located in coordinates ${center.join(', ')}`)
        
        makeRequest(
          config.getWeatherByCoordinates(center),
          (response) => {
            if (response.body.error) {
              msg.warning('Error in the weather url.')
            } else {
              const {temperature, precipProbability} = response.body.currently // KNOWING THE JSON STRUCTURE, I CAN DECONSTRUCT THE RESPONSE OBJECT INTO THE PROPERTIES I NEED
              const dailyData = response.body.daily.data
              msg.success(`It is currently ${temperature}° out. There is a ${precipProbability*100}% change of rain. Today´s summary is ${dailyData[0].summary}`)
            }
          }
        )
      } else {
        msg.warning('Error in the location url.')
      }
    }
  )
}

module.exports = {
	getLocationAndWeather
}