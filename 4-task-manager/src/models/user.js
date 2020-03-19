const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// IMPORT MODELS
const Task = require('./task')
// IMPORT STRINGS
const strings = require('../../configs/strings')

const userSchema = new mongoose.Schema(
	{
    name: {
			type: String,
			required: true,
			trim: true
    },
    email: {
			type: String,
      unique: true, // CANNOT BE OTHER EQUAL THAT THIS VALUE
      required: true, // CANNOT AVOID INCLUDING THIS FIELD WHEN INSERT A NEW DOCUMENT
      trim: true, // REMOVE EMPTY SPACES BEFORE AND AFTER STRING
      lowercase: true, // CHANGE ENTIRE STRING INTO LOWERCASE
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error(strings.invalid.email)
				}
			}
		},
		age: {
      type: Number,
      validate: (value) => {
        if (value <= 18) {
          throw new Error(strings.invalid.age(18))
        }
      }
    },
    password: {
			type: String,
			required: true,
			minlength: 6,
			trim: true,
			validate(value) {
				if (value.toLowerCase().includes('password')) {
					throw new Error(strings.invalid.password(6))
				}
			}
    },
    tokens: [{
			token: {
				type: String,
				required: true
			}
    }],
    avatar: {
			type: Buffer
    }
	}, {
			timestamps: true
	}
)

// VIRTUAL IS USED TO REALTE DOCUMENTS RELATED TO THIS USER (BUT ARE NOT RELATED BY PRIMARY/FOREIGN KEY RELATIONSHIP LIKE SQL)
userSchema.virtual(
  'tasks', // WHAT DOCUMENT CONTAINER YOU ARE MAKING REFERENCE IN THE VIRTUAL PROPERTY
  {
  ref: 'Task', // WHAT MODEL YOU ARE MAKING REFERENCE
  localField: '_id', // WHAT FIELD IN YOUR DOCUMENT IS USED TO MAKE THE RELATIONSHIP (LIKE A PRIMARY KEY)
  foreignField: 'author' // HOW IS CALLED YOUR LOCAL FIELD IN THE DOCUMENT WHICH YOU MADE THE RELATIONSHIP (LIK E A FOREIGN KEY)
  }
)

userSchema.statics.findByCredentials = async (email, password) => {
	const finded = await User.findOne({ email })

	if (!finded) {
		throw new Error(strings.unableLogin)
	}

	const isMatch = await bcrypt.compare(password, finded.password)

	if (!isMatch) {
		throw new Error(strings.unableLogin)
	}

	return finded
}

// ACCESIBLE TO INSTANCE
userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

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
})

// ACCESIBLE TO THE MODEL. USED TO DELETE ALL THE TASKS RELATED TO THIS USER (LIKE A CASCADE DELETE)
userSchema.pre(
	'remove',
	async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
	}
)

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens
	delete userObject.avatar

	return userObject
}
const User = mongoose.model('User', userSchema)

module.exports = User