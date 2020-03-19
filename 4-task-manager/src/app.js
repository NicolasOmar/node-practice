const express = require('express')
// REQUIRE ALL 'MONGOOSE' CODE
require('./db/mongoose')
// IMPORT ROUTERS
const tasksRouter = require('./routes/tasks')
const usersRouter = require('./routes/users')
// IMPORT AND SET EXPRESS SERVER
const app = express()
app.use(express.json())
// INTEGRATE ROUTERS TO THE INDEX FILE
app.use(tasksRouter)
app.use(usersRouter)

module.exports = app