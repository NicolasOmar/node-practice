const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {
  firstUser,
  secondUserId,
  secondUser,
  setUpDatabase
} = require('./fixtures/db')

beforeEach(
  async () => await setUpDatabase()
)

test(
  'Node - signup a new user',
  async () => {
    const response = await request(app)
        .post('/users')
        .send(firstUser)
        .expect(201)
        
    const user = await User.findById(response.body.newUser._id)

    expect(user).not.toBeNull()
    expect(user.password).not.toBe(firstUser.password)
  }
)

test(
  'Node - login created user - HAPPY PATH',
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
  'Node - login created user - SAD PATH',
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

test(
  'Node - get profile for user',
  async () => {
    await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${secondUser.tokens[0].token}`)
      .send()
      .expect(200)
  }
)

test(
  'Node - delete authenticated user - HAPPY PATH',
  async () => {
    await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${secondUser.tokens[0].token}`)
      .send()
      .expect(200)
  }
)

test(
  'Node - delete authenticated user - SAD PATH',
  async () => {
    await request(app)
      .delete('/users/me')
      .send()
      .expect(401)
  }
)

test(
  'Node - update authenticated user - HAPPY PATH',
  async () => {
    const name = 'TEST'
    
    await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${secondUser.tokens[0].token}`)
      .send({ name })
      .expect(200)

    const user = await User.findById(secondUserId)
    expect(user.name).toBe(name)
  }
)

test(
  'Node - update authenticated user - SAD PATH',
  async () => {
    const location = 'TEST'
    await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${secondUser.tokens[0].token}`)
      .send({ location })
      .expect(400)
  }
)