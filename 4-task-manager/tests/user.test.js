const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userTest = {
  name: 'First User',
  email:'idea@gmail.com',
  password: '15asd20'
}
const secondUser = {
  name: 'Second User',
  email:'second@gmail.com',
  password: '1asdas520'
}

beforeEach(
  async () => {
    await User.deleteMany()
    await new User(secondUser).save()
  }
)

test(
  'Node test - signup a new user',
  async () => {
    await request(app)
      .post('/users')
      .send(userTest)
      .expect(201)
  }
)

test(
  'Node test - login created user - HAPPY PATH',
  async () => {
    await request(app)
      .post('/users/login')
      .send({
        email: secondUser.email,
        password: secondUser.password
      })
      .expect(200)
  }
)

test(
  'Node test - login created user - SAD PATH',
  async () => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'test',
        password: 'testeduser'
      })
      .expect(400)
  }
)