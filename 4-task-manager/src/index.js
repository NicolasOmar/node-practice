const express = require('express')
const chalk = require('chalk')
// REQUIRE ALL 'MONGOOSE' CODE
require('./db/mongoose')
// IMPORT AND SET EXPRESS SERVER
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// IMPORT API FILES
require('./api/users')(app)
require('./api/tasks')(app)

app.listen(
  port,
  () => console.log(chalk.white.bold.bgGreen(`Server up and working on port ${port}`))
)