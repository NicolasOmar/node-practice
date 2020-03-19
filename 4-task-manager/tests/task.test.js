const request = require('supertest')
const app = require('../src/app')
const {
  secondUser,
  setUpDatabase
} = require('./fixtures/db')

beforeEach(
  async () => await setUpDatabase()
)

test(
  'Node - Create a task',
  async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${secondUser.tokens[0].token}`)
        .send({
          description: 'My first idea'
        })
        .expect(201)
  }
)