const express = require('express')
const router = new express.Router()
// IMPORT MIDDLEWARE
const authenticator = require('../middleware/auth')
// IMPORT MODEL
const User = require('../models/user')
// IMPORT STRINGS
const strings = require('../../configs/strings')

// FIND ALL THE USERS
router.get(
  '/users',
  authenticator,
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
  authenticator,
  async (request, response) => {
    try {
      response.send(request.user)
    } catch (error) {
      response.status(400).send(error)
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

// UPDATE YOUR USER DATA
router.patch(
  '/users/me',
  authenticator,
  async(request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = 
      Object.keys(request.body).every(
        update => allowedUpdates.includes(update)
      )
    
    !isValidOperation && response.status(400).send({ error: strings.invalid.updates})

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

// DELETE YOUR USER
router.delete(
  '/users/me',
  authenticator,
  async (request, response) => {
    try {
      await request.user.remove()
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
      const { email, password } = request.body
      const userLogged = await User.findByCredentials(email, password)
      const token = await userLogged.generateAuthToken()
      response.send({ userLogged, token })
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

// LOGOUT YOUR USER FROM ONE DEVICE USING ITS TOKEN
router.post(
  '/users/logout',
  authenticator,
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

// LOGOUT YOUR USER FROM ALL CONNECTED DEVICES
router.post(
  '/users/logoutAll',
  authenticator,
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

module.exports = router