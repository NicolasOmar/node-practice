module.exports = {
  serverOn: port => `Server is up and running on port ${port}`,
  welcomeMsg: 'Welcome to my chat application!',
  userJoined: user => `${user} has joined!`,
  userLeft: user => `${user} has left!`,
  sendLocation: coordinates => `Location: http://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`,
  msgDelivered: 'The message was delivered!',
  locationShared: 'Location shared',
  joined: 'You have been joined',
  error: {
    dataRequired: 'Username and room are required',
    userInUse: 'This username is in use',
  }
}