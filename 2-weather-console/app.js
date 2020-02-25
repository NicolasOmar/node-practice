const { getLocationAndWeather } = require('./request.js')

const address = process.argv[2]

getLocationAndWeather(address)