module.exports = {
  serverOn: port => `Server is up and running on port ${port}`,
  welcomeMsg: 'Welcome to my chat application!',
  userJoined: 'A new user has joined',
  userLeft: 'A user has left!',
  sendLocation: (coordinates) => `Location: http://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
}