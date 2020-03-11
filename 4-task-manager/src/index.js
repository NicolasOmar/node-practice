const express = require('express')
const chalk = require('chalk')
// REQUIRE ALL 'MONGOOSE' CODE
require('./db/mongoose')
// IMPORT AND SET EXPRESS SERVER
const app = express()
const port = process.env.PORT || 3000

const tasksRouter = require('./routes/tasks')
const usersRouter = require('./routes/users')

app.use(express.json())
app.use(tasksRouter)
app.use(usersRouter)

app.listen(
  port,
  () => console.log(chalk.white.bold.bgGreen(`Server up and working on port ${port}`))
)