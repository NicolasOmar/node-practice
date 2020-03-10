const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model(
  'User',
  {
    name: {
      type: String
    },
    age: {
      type: Number,
      validate: (value) => {
        if (value <= 0) {
          throw new Error('BAD')
        }
      }
    },
    password: {
      type: String,
      trim: true,
      validate: (value) => {
        if (validator.contains(value, 'password') || value.lenght < 6) {
          throw new Error('MY BAD')
        }
      }
    }
  }
)

module.exports = User