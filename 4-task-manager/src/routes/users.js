const express = require('express')
const router = new express.Router()
// IMPORT MODEL
const User = require('../models/user')

// FIND ALL THE USERS
router.get(
  '/users',
  async (request, response) => {
    try {
      const users = await User.find({})
      response.status(201).send(users)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

// FIND AN USER USING ID ONLY
router.get(
  '/users/:id',
  async (request, response) => {
    try {
      const user = await User.findById(request.params.id)
      !user && response.status(404).send()
      response.send(user)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

// LOGIN A USER
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
  '/users/:id',
  async(request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = 
      Object.keys(request.body).every(
        update => allowedUpdates.includes(update)
      )
    
    !isValidOperation && response.status(400).send({ error: 'invalid updates'})

    try {
      const updatedUser = await User.findById(request.params.id)

      updates.forEach(update => updatedUser[update] = request.body[update])
      await updatedUser.save()

      !updatedUser && response.status(404).send()
      response.send(updatedUser)
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