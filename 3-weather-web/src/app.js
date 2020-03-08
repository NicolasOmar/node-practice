const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
// REQUIRING CONFIG FILES
const configStrings = require('../config/strings.js')
const configRequest = require('../config/config.js')

// CALL PATTERN: RETURN FUNCTION TO REDUCE CODE AND MANTAIN EACH SPECIFIC RESPONSE
const makeRequest = (config, callback) => {
	request.get(
		config,
		(error, response) => error ? response.send({ error: 'Unable to connect.' }) : callback(response)
	)
}

const app = express()

// SETUP PATHS
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicPath))

app.get('', (request, response) => {
  response.render('index', {
    ...configStrings,
  })
})

app.get('/about', (request, response) => {
  response.render('about', {
    ...configStrings,
  })
})

app.get('/help', (request, response) => {
  response.render('help', {
    message: 'Here i am to help you in what you need',
    ...configStrings
  })
})

app.get('/weather', (request, response) => {
  if (!request.query.address) {
    response.send({
      error: 'You must provide an address'
    })
  } else {
    makeRequest(
      configRequest.getLocationByAddress(request.query.address),
      ({ body }) => {
        if (body.features && body.features.length) {
          const {place_name, center} = body.features[0] // KNOWING THE JSON STRUCTURE, I CAN DECONSTRUCT THE RESPONSE OBJECT INTO THE PROPERTIES I NEED
          
          makeRequest(
            configRequest.getWeatherByCoordinates(center),
            ({ body }) => {
              if (body.error) {
                response.send({
                  error: 'Error in the weather url.'
                })
              } else {
                const {temperature, precipProbability} = body.currently // KNOWING THE JSON STRUCTURE, I CAN DECONSTRUCT THE RESPONSE OBJECT INTO THE PROPERTIES I NEED
                response.send({
                  location: place_name,
                  temperature,
                  precipitation: precipProbability*100,
                  summary: body.daily.data[0].summary
                })
              }
            }
          )
        } else {
          response.send({
            error: 'Error in the location url.'
          })
        }
      }
    )
  }
})

// IN CASE THE USER GOES TO A NON EXISTING PAGE, REDIRECT TO THIS PAGE
app.get('*', (request, response) => {
  response.render('not-found', {
    ...configStrings
  })
})

app.listen(
  3000,
  () => console.log(`Server is up on port ${3000}`)
)