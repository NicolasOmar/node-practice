const express = require('express')
const router = new express.Router()
// IMPORT MODEL
const Task = require('../models/task')

router.get(
    '/tasks',
    async (request, response) => {
      try {
        const tasks = await Task.find({})
        response.status(201).send(tasks)
      } catch (error) {
        response.status(400).send(error)
      }
    }
  )

router.get(
    '/tasks/:id',
    async (request, response) => {
      try {
        const task = await Task.findById(request.params.id)
        !task && response.status(404).send()
        response.send(task)
      } catch (error) {
        response.status(400).send(error)
      }
    }
  )
  
router.post(
    '/tasks',
    async (request, response) => {
      const newTask = new Task(request.body)

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
  async(request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['completed', 'description']

    const isValidOperation = 
      Object.keys(request.body).every(
        update => allowedUpdates.includes(update)
      )
    
    !isValidOperation && response.status(400).send({ error: 'invalid updates'})

    try {
      const updatedTask = await Task.findById(request.params.id)

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
  async (request, response) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(request.params.id)
      !deletedTask && response.status(404).send()
      response.send(deletedTask)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

module.exports = router