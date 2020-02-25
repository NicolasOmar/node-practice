const request = require('request')
const {msg} = require('./utils.js')

// CONFIGURATION CONSTANTS
const secretKey = 'cdacfaddf1d7dfedeb68a470bd6dee1e'
const weatherConfig = {
	url: `https://api.darksky.net/forecast/${secretKey}/37.8267,-122.4233`,
	json: true, // TO RETURN BODY RESPONSE INTO JSON
	units: 'si'
}
const locationConfig = {
	url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoibmljb2xhc29tYXIiLCJhIjoiY2s3MWI5Yzg0MDRreTNtdGttdmF1ejhvaiJ9.PW17WdChdu0-jM2otvaWPQ',
	json: true
}
// GET FUNCTION TO REDUCE CODE AND MANTAIN EACH SPECIFIC RESPONSE
const get = (config, _function) => {
	request.get(
		config,
		(error, response) => {
			if (error) {
				msg.fail('Unable to connect.')
			} else {
				if (response.body.error) {
					msg.warning('Error in the url.')
				} else {
					_function(response)
				}
			}
		}
	)
}

get(
	weatherConfig,
	(response) => {
		const {temperature, precipProbability} = response.body.currently
		const dailyData = response.body.daily.data
		msg.success(`It is currently ${temperature}° out. There is a ${precipProbability}% change of rain. Today´s summary is ${dailyData[0].summary}`)
	}
)

get(
	locationConfig,
	(response) => {
		if (response.body.features) {
			const {place_name, center} = response.body.features[0] // KNOWING THE JSON STRUCTURE, I CAN DECONSTRUCT THE RESPONSE OBJECT INTO THE PROPERTIES I NEED
			msg.success(`${place_name} is located in coordinates ${center.join(', ')}`)
		} else {
			msg.warning('Error in the url.')
		}
	}
)