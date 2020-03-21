const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
// IMPORT CONFIGURATIONS STRINGS
const strings = require('../config/strings')

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
    // THE CLIENT WILL GET A CONSOLE NOTIFICATION WITH A WELCOME MESSAGE
    socket.emit('sendMessage', strings.welcomeMsg)
    // ALL THE CONNECTED USER (EXCEPT THE ONE IS BEEN CONNECTED) WILL RECIVE THE NEW MESSAGE
    socket.broadcast.emit('sendMessage', strings.userJoined)
    
    // WHEN ANY CLIENT FIRES THE 'INCREMENT' EVENT (A CUSTOM ONE), THE SERVER WILL EXECUTE A FUNCTION
    socket.on(
      'sendMessage',
      (message) => io.emit('sendMessage', message)
      /*
        THIS EVENT IS SENDED TO EVERY CONNECTED CLIENT.
        IF YOU WANT TO SENDED ONLY TO THE CLIENT WHO FIRE THE EVENT, USE THE FOLLOWING:
        socket.emit('countUpdated', count)
      */
    )
    
    // WHEN THE USER SENDS A 'sendLocation', IT WILL EMIT A MESSAGE TO THE OTHER CONNECTED USERS
    socket.on(
      'sendLocation',
      (coords) => io.emit('sendMessage', strings.sendLocation(coords))
    )

    // WHEN THE USER HAS BEEN DISCONECTED, IT WILL SEND A MESSAGE TO THE OTHER USERS
    socket.on('disconnect', () => io.emit('sendMessage', strings.userLeft))
  }
)

expressServer.listen(
  port,
  () => console.log(strings.serverOn(port))
)