const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
// IMPORT MODEL
const Task = require('../models/task')

router.get(
    '/tasks',
    auth,
    async (request, response) => {
      try {
        const tasks = await Task.find({ author: request.user._id })
        response.status(201).send(tasks)
      } catch (error) {
        response.status(400).send(error)
      }
    }
  )

router.get(
    '/tasks/:id',
    auth,
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
  
router.post(
    '/tasks',
    auth,
    async (request, response) => {
      const newTask = new Task({
        ...request.body,
        author: request.user._id
      })

      try {
        await newTask.save()
        response.status(201).send(newTask)
      } catch (error) {
        response.status(400).send(error)
      }
    }
  )
  
router.patch(
  '/tasks/:id',
  auth,
  async(request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['completed', 'description']

    const isValidOperation = 
      Object.keys(request.body).every(
        update => allowedUpdates.includes(update)
      )
    
    !isValidOperation && response.status(400).send({ error: 'invalid updates'})

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
  
router.delete(
  '/tasks/:id',
  auth,
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