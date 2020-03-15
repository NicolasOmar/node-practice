const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
// IMPORT MODEL
const User = require('../models/user')

// FIND ALL THE USERS
router.get(
  '/users',
  auth,
  async (request, response) => {
    try {
      const users = await User.find({})
      response.status(201).send(users)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

// FIND YOUR USER DATA
router.get(
  '/users/me',
  auth,
  async (request, response) => {
    try {
      response.send(request.user)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

// LOGIN AN USER
router.post(
  '/users/login',
  async(request, response) => {
    try {
      const userLogged = await User.findByCredentials(request.body.email, request.body.password)
      const token = await userLogged.generateAuthToken()
      response.send({ userLogged, token })
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

router.post(
  '/users/logout',
  auth,
  async (request, response) => {
    try {
      request.user.tokens = request.token.tokens.filter(
        token => token.token !== request.token
      )
      await request.user.save()
      response.send()
    } catch (error) {
      response.status(500).send()
    }
  }
)

router.post(
  '/users/logoutAll',
  auth,
  async (request, response) => {
    try {
      request.user.tokens = []
      await request.user.save()
      response.send()
    } catch (error) {
      response.status(500).send()
    }
  }
)

// INSERT A NEW USER
router.post( 
  '/users',
  async (request, response) => {
    const newUser = new User(request.body)

    try {
      await newUser.save()
      const token = await newUser.generateAuthToken()
      response.status(201).send({ newUser, token})
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

// UPDATE AN USER DATA
router.patch(
  '/users/me',
  auth,
  async(request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = 
      Object.keys(request.body).every(
        update => allowedUpdates.includes(update)
      )
    
    !isValidOperation && response.status(400).send({ error: 'invalid updates'})

    try {
      updates.forEach(update => request.user[update] = request.body[update])
      await request.user.save()

      !request.user && response.status(404).send()
      response.send(request.user)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

// DELETE AN USER
router.delete(
  '/users/:id',
  async (request, response) => {
    try {
      const deletedUser = await User.findByIdAndDelete(request.params.id)
      !deletedUser && response.status(404).send()
      response.send(deletedUser)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

module.exports = router