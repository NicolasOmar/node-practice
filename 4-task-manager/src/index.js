const express = require('express')
const chalk = require('chalk')
// REQUIRE ALL 'MONGOOSE' CODE
require('./mongoose')
// IMPORT AND SET EXPRESS SERVER
const app = express()
const port = process.env.PORT || 3000
// IMPORT ROUTERS
const tasksRouter = require('./routes/tasks')
const usersRouter = require('./routes/users')
const Task = require('./models/task')
const User = require('./models/user')

app.use(express.json())
// INTEGRATE ROUTERS TO THE INDEX FILE
app.use(tasksRouter)
app.use(usersRouter)

app.listen(
  port,
  () => console.log(chalk.white.bold.bgGreen(`Server up and working on port ${port}`))
)

const test = async () => {
  // const task = await Task.findById('5e6d8b215087d03ec41e6d80')
  // await task.populate('author').execPopulate()
  // console.log(task.author)
  const user = await User.findById('5e6d8a426fb1063848a4f4c2')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

test()

// virtual properties are relationships between two entities