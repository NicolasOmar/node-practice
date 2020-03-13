const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true, // CANNOT BE OTHER EQUAL THAT THIS VALUE
      required: true,
      trim: true, // REMOVE EMPTY SPACES BEFORE AND AFTER STRING
      lowercase: true, // CHANGE ENTIRE STRING INTO LOWERCASE
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error('The user needs to have a valid email')
        }
      }
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
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  }
)

userSchema.statics.findByCredentials = async (email, password) => {
  const finded = await User.findOne({email})
  
  if (!finded) {
    throw new Error('Unable to login')
  }

  const user = await bcrypt.compare(password, finded.password)

  if (!user) {
    throw new Error('Unable to login')
  }

  return finded
}

// ACCESIBLE TO INSTANCE
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'iamtestingthelibrary')

  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// ACCESIBLE TO MODEL. USED TO HASH THE PASSWORD BEFORE SAVING
userSchema.pre(
  'save',
  async function (next) {
    const user = this

    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
    }

    next()
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User