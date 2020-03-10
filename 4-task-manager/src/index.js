const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post( 
  '/users',
  (request, response) => {
    const newUser = new User(request.body)

    newUser.save()
      .then(
        data => response.send(data)
      )
      .catch(
        data => response.send(data)
      )
  }
)

app.post(
  '/tasks',
  (request, response) => {
    const newTask = new Task(request.body)

    newTask.save()
      .then(
        data => response.send(data)
      )
      .catch(
        data => response.send(data)
      )
  }
)

app.listen(
  port,
  () => console.log(`Server up and working on port ${port}`)
)