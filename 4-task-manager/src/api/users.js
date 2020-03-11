const User = require('../models/user')

module.exports = (app) => {
  // FIND ALL THE USERS
  app.get(
    '/users',
    (request, response) => {
      User.find({})
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
    '/users/:id',
    (request, response) => {
      User.findById(request.params.id)
        .then(
          data => response.send(data)
        )
        .catch(
          error => response.status(500).send(error)
        )
    }
  )

  // INSERT A NEW USER
  app.post( 
    '/users',
    (request, response) => {
      const newUser = new User(request.body)

      newUser.save()
        .then(
          data => response.send(data)
        )
        .catch(
          error => response.status(400).send(error)
        )
    }
  )
}