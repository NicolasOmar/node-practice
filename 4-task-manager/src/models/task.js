const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // MONGOOSE TYPE USED TO HANDLE OBJECTID (LIKE A FOREIGN KEY IN SQL)
      required: true,
      ref: 'User' // MAKES REFERENCE TO THE DOCUMENT TYPE (AN USED RELATED TO THIS TASK)
    }
  }, {
    timestamps: true // ADDED TO SET 'CREATEDAT' AND 'UPDATEDAT' FIELDS, HELPING SORTING FEATURE
  }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task