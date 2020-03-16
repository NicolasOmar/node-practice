const express = require('express')
const router = new express.Router()
// IMPORT MIDDLEWARE
const authenticator = require('../middleware/auth')
// IMPORT MODEL
const Task = require('../models/task')
// IMPORT STRINGS
const strings = require('../../configs/strings')

// GET ALL THE TASKS RELATED TO THE AUTHENTICATED USER, FILTERING AND SORTING THEM
router.get(
    '/tasks',
    authenticator,
    async (request, response) => {
      const match = {}
      const options = {
        limit: parseInt(request.query.limit || 5),
        skip: parseInt(request.query.skip || 0),
        sort: {}
      }

      if (request.query.completed) {
        match.completed = request.query.completed === 'true'
      }

      if (request.query.sortBy) {
        const parts = request.query.sortBy.split(':')
        options.sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
      }

      try {
        await request.user.populate({
          path: 'tasks',
          match,
          options
        })
        response.send(request.user.tasks)
      } catch (error) {
        response.status(400).send(error)
      }
    }
  )

// GET A TASK INFORMATION
router.get(
    '/tasks/:id',
    authenticator,
    async (request, response) => {
      try {
        const task = await Task.findOne({ _id: request.params.id, author: request.user._id })
        !task && response.status(404).send()
        response.send(task)
      } catch (error) {
        response.status(400).send(error)
      }
    }
  )
  
// INSERT A NEW TASK
router.post(
    '/tasks',
    authenticator,
    async (request, response) => {
      const newTask = new Task({
        ...request.body,
        author: request.user._id
      })

      try {
        await newTask.save()
        response.status(201).send(newTask) // 200 IS THE DEFAULT STATUS CODE FOR AN OK OPERATION. IF YOU WANT TO CHANGE THE STATUS CODE (FOR AN ERROR RESPONSE), JUST INCLUDE .STATUS(XXX) BEFORE THE .SEND()
      } catch (error) {
        response.status(400).send(error)
      }
    }
  )
  
// UPDATE TASK DATA
router.patch(
  '/tasks/:id',
  authenticator,
  async (request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['completed', 'description']

    const isValidOperation = 
      Object.keys(request.body).every(
        update => allowedUpdates.includes(update)
      )
    
    !isValidOperation && response.status(400).send({ error: strings.invalid.updates})

    try {
      const updatedTask = await Task.findOne({ _id: request.params.id, author: request.user._id })

      updates.forEach(update => updatedTask[update] = request.body[update])

      await updatedTask.save()
      !updatedTask && response.status(404).send()

      response.send(updatedTask)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)
 
// DELETE TASK FROM THE DATABASE
router.delete(
  '/tasks/:id',
  authenticator,
  async (request, response) => {
    try {
      const deletedTask = await Task.findOneAndDelete({ _id: request.params.id, author: request.user._id })
      !deletedTask && response.status(404).send()
      response.send(deletedTask)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

module.exports = router