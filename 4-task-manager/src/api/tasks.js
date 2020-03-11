const Task = require('../models/task')

module.exports = (app) => {
  // FIND ALL THE USERS
  app.get(
    '/tasks',
    (request, response) => {
      Task.find({})
        .then(
          data => response.send(data)
        )
        .catch(
          error => response.status(500).send(error)
        )
    }
  )

  // FIND AN USER USING ID ONLY
  app.get(
    '/tasks/:id',
    async (request, response) => {
      Task.findById(request.params.id)
        .then(
          data => response.send(data)
        )
        .catch(
          error => response.status(500).send(error)
        )
    }
  )

  // INSERT A NEW TASK
  app.post(
    '/tasks',
    (request, response) => {
      const newTask = new Task(request.body)

      newTask.save()
        .then(
          data => response.send(data)
        )
        .catch(
          error => response.status(400).send(error)
        )
    }
  )
}