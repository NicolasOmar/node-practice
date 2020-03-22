const { error } = require('./strings')
const users = []

// ADD A NEW USER
const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  if (!username || !room) {
    return { error: error.dataRequired }
  }

  const userExists = users.find(item => item.username === username && item.room === room)

  if (userExists) {
    return { error: error.userInUse }
  }

  const user = { id, username, room}
  users.push(user)
  return { user }
}

// REMOVE AN USER
const removeUser = id => users.splice(users.findIndex(user => user.id === id), 1)[0]

// GET ANY USER
const getUser = id => users.find(user => user.id === id)

// GET ALL THE USERS ON THE ROOM
const getUsersInRoom = room => users.filter(user => user.room === room)

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}