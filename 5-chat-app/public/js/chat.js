// FIRST YOU GET THE SOCKET.IO FUNCTIONALITY CALLING 'IO()'
const socket = io()

// WHEN THE CLIENT GETS CONNECTED, IT WILL GET A CONSOLE NOTIFICATION ABOUT THE STATUS (FIRED IN THE SERVER)
socket.on(
  'sendMessage',
  (message) => console.log(message)
)

document.querySelector('#message-form')
  .addEventListener(
    'submit',
    (e) => {
      e.preventDefault()
      const message = document.querySelector('input').value
      socket.emit('sendMessage', message)
    }
  )

// WHEN A USER CLICKS ON THE BUTTON TO SEND ITS LOCATION
document.querySelector('#location-send-button').addEventListener(
  'click',
  () => {
    // IF USER DOESN´T AGREE TO SHARE ITS LOCATION, THE APP WILL RETURN AN ALERT
    if (!window.navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.')
    }

    // THE LOCATION SERVICE WILL RETURN AN OBJECT WITH LOCATION DATA WHICH WILL BE EMITED ON A SOCKET EVENT AND BE LISTENED ON THE SERVER
    window.navigator.geolocation.getCurrentPosition(
      position => {
        socket.emit(
          'sendLocation',
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
      }
    )
  }
)