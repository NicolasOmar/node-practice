const path = require('path')
const express = require('express')
const hbs = require('hbs')
const configStrings = require('../config/strings.js')

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

// IN CASE THE USER GOES TO A NON EXISTING PAGE, REDIRECT TO THIS PAGE
app.get('*', (request, response) => {
  response.render('not-found', {
    ...configStrings
  })
})

app.get('/weather', (request, response) => {
  response.send({
    forecast: 15,
    location: {
      x: -150.251,
      y: 35.21510
    }
  })
})

app.listen(
  3000,
  () => console.log(`Server is up on port ${3000}`)
)