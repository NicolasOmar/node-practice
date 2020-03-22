const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
// IMPORT CONFIGURATIONS STRINGS
const strings = require('../config/strings')
// DESTRUCT THE UTILS MSG TO USE THE 'returnMsg' ONLY, WHICH WILL RETURN A MESSAGE MSG WITH THE TIMESTAMP
const { returnMsg } = require('../config/utils')
//
const { addUser, removeUser, getUser, getUsersInRoom } = require('../config/users')

// CREATE A NEW EXPRESS INSTANCE
const app = express()
// CREATE A SERVER INSTENCE OF EXPRESS USING THE APP CONSTANT TO CONFIGURE IT
const expressServer = http.createServer(app)
// ASOCIATE WEBSOCKET PROTOCOL TO THE EXPRESS SERVER TO MAKE WORK BOTH PROTOCOLS ON THE APP
const io = socketio(expressServer)

// SETUP SERVER PORT AND RENDER PATHS
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

// WHEN YOU VIEW 'LOCALHOST:3000', IT WILL RENDER THE INDEX PAGE ON PUBLIC FOLDER
app.get('', (request, response) => {
  response.render('index')
})

// SOCKET.IO EXECUTES A FUNCTION WHEN A CLIENT IS CONNECTED
io.on(
  'connection',
  (socket) => {    
    // WHEN ANY CLIENT FIRES THE 'sendMessage' EVENT (A CUSTOM ONE), THE SERVER WILL EXECUTE A FUNCTION
    socket.on(
      'sendMessage',
      (message, callback) => {
        const {username, room} = getUser(socket.id)
        /*
          THIS EVENT IS SENDED TO EVERY CONNECTED CLIENT.
          IF YOU WANT TO SENDED ONLY TO THE CLIENT WHO FIRE THE EVENT, USE THE FOLLOWING:
          socket.emit('countUpdated', count)
        */
        io.to(room).emit('sendMessage', returnMsg(username, message))
        /*
          THE 'callback' FUNCTION IS THE SECOND ARGUMENT ON THE FUNCTION TO EXECUTE WHEN A EVENT
          HAS BEEN LISTENED BY THE SERVER. IT WILL RETURN A MESSAGE TO THE USER TO CONFIRM THAT
          THE ACTION HAS BEEN SUCCESSsFULL
        */
        callback(strings.msgDelivered)
      }      
    )
    
    // WHEN THE USER SENDS A 'sendLocation', IT WILL EMIT A MESSAGE TO THE OTHER CONNECTED USERS
    socket.on(
      'sendLocation',
      (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('sendLocationMsg', returnMsg(user.username, strings.sendLocation(coords)))
        callback(strings.locationShared)
      }
    )

    // WHEN THE USER HAS BEEN DISCONECTED, IT WILL SEND A MESSAGE TO THE OTHER USERS
    socket.on(
      'disconnect',
      () => {
        const user = removeUser(socket.id)
        user &&
          io.to(user.room).emit('sendMessage', returnMsg(user.username, strings.userLeft(user.username))) &&
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
      }
    )

    socket.on(
      'join',
      (userData, callback) => {
        const { error, user } = addUser({ id: socket.id, ...userData })

        if (error) {
          return callback(error)
        }

        // YOU ARE SENDING AN EVENT TO EVERY USER LOGGEN IN THE ROOM
        socket.join(user.room)

        // THE CLIENT WILL GET A CONSOLE NOTIFICATION WITH A WELCOME MESSAGE
        socket.emit('sendMessage', returnMsg(user.username, strings.welcomeMsg))
        // ALL THE USERS ON THE ROOM (EXCEPT THE ONE IS BEEN CONNECTED) WILL RECIVE THE MESSAGE
        socket.broadcast.to(user.room).emit('sendMessage', returnMsg(user.username, strings.userJoined(user.username)))
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
      }
    )
  }
)

expressServer.listen(
  port,
  () => console.log(strings.serverOn(port))
)