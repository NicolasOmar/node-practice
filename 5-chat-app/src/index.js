const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
// IMPORT CONFIGURATIONS STRINGS
const strings = require('../config/strings')
// DESTRUCT THE UTILS MSG TO USE THE 'returnMsg' ONLY, WHICH WILL RETURN A MESSAGE MSG WITH THE TIMESTAMP
const { returnMsg } = require('../config/utils')

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
    socket.emit('sendMessage', returnMsg(strings.welcomeMsg))
    // ALL THE CONNECTED USER (EXCEPT THE ONE IS BEEN CONNECTED) WILL RECIVE THE NEW MESSAGE
    socket.broadcast.emit('sendMessage', returnMsg(strings.userJoined))
    
    // WHEN ANY CLIENT FIRES THE 'sendMessage' EVENT (A CUSTOM ONE), THE SERVER WILL EXECUTE A FUNCTION
    socket.on(
      'sendMessage',
      (message, callback) => {
        /*
          THIS EVENT IS SENDED TO EVERY CONNECTED CLIENT.
          IF YOU WANT TO SENDED ONLY TO THE CLIENT WHO FIRE THE EVENT, USE THE FOLLOWING:
          socket.emit('countUpdated', count)
        */
        io.emit('sendMessage', returnMsg(message))
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
        io.emit('sendLocationMsg', strings.sendLocation(coords))
        callback(strings.locationShared)
      }
    )

    // WHEN THE USER HAS BEEN DISCONECTED, IT WILL SEND A MESSAGE TO THE OTHER USERS
    socket.on('disconnect', () => io.emit('sendMessage', returnMsg(strings.userLeft)))
  }
)

expressServer.listen(
  port,
  () => console.log(strings.serverOn(port))
)