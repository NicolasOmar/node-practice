// WEATHER
const secretKey = 'cdacfaddf1d7dfedeb68a470bd6dee1e'
// RETURN THE URL CONFIG OBJECT BASED ON COORDINATES FROM THE USER
const getWeatherByCoordinates = (coordinates) => {
  return {
    url: `https://api.darksky.net/forecast/${secretKey}/${coordinates.join(',')}`,
    json: true, // TO RETURN BODY RESPONSE INTO JSON
    units: ['si']
  }
}

// LOCATION
const secretToken = 'pk.eyJ1Ijoibmljb2xhc29tYXIiLCJhIjoiY2s3MWI5Yzg0MDRreTNtdGttdmF1ejhvaiJ9.PW17WdChdu0-jM2otvaWPQ'
// RETURN THE URL CONFIG OBJECT BASED ON AN ADRRESS FROM THE USER
const getLocationByAddress = (address) => {
  return {
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${secretToken}`,
    json: true
  }
}

module.exports = {
  getWeatherByCoordinates,
  getLocationByAddress
}