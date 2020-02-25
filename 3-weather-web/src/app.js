const express = require('express')

const app = express()

app.get('', (request, response) => {
  response.send('Hello there!')
})

app.get('/about', (request, response) => {
  response.send('Who we are?')
})

app.get('/weather', (request, response) => {
  response.send('It is raining now?')
})

app.listen(
  3000,
  () => console.log(`Server is up on port ${3000}`)
)