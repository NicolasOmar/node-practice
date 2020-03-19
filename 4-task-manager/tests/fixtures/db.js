const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
// const Task = require('../../src/models/task')
const firstUser = {  
  name: 'First User',
  email:'first@gmail.com',
  password: 'dsagrtyh',  
}

const secondUserId = new mongoose.Types.ObjectId()
const secondUser = {
  _id: secondUserId,
  name: 'Second User',
  email:'second@gmail.com',
  password: 'dasfasdf',
  tokens: [{
    token: jwt.sign({ _id: secondUserId}, process.env.JWT_SECRET)
  }]
}

// const taskOne = {
//   _id: new mongoose.Types.ObjectId(),
//   description: 'First task',
//   completed: false,
//   author: secondUser._id
// }

// const taskTwo = {
//   _id: new mongoose.Types.ObjectId(),
//   description: 'Second task',
//   completed: true,
//   author: secondUser._id
// }

const setUpDatabase = async () => {
  await User.deleteMany()
  await new User(secondUser).save()
  // await new Task(taskOne).save()
  // await new Task(taskTwo).save()
}

module.exports = {
  firstUser,
  secondUserId,
  secondUser,
  setUpDatabase
}