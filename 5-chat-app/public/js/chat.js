// FIRST YOU GET THE SOCKET.IO FUNCTIONALITY CALLING 'IO()'
const socket = io()

// DOM ELEMENTS
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('input')
const $locationButton = document.querySelector('#location-send-button')
const $messages = document.querySelector('#messages')
// DOM/SCRIPT TEMPLATES
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

socket.on(
  'sendMessage',
  (message) => {
    // RENDER THE DIV INSIDE SCRIPT AS A HTML USING MUSTACHE LIBRARY
    const html = 
      Mustache.render(
        messageTemplate,
        {
          createdAt: moment(message.createdAt).format('DD/MM/YYYY, HH:hh:ss'),
          message: message.text
        }
      )
    // ADD RENDERED HTML IN THE MESSAGE DOM
    $messages.insertAdjacentHTML('beforeend', html)
  }
)

socket.on(
  'sendLocationMsg',
  (location) => {
    location = `${location.replace('Location: ', '')}`
    // RENDER THE DIV INSIDE SCRIPT AS A HTML USING MUSTACHE LIBRARY
    const html = 
      Mustache.render(
        locationTemplate,
        { location }
      )
    // ADD RENDERED HTML IN THE MESSAGE DOM
    $messages.insertAdjacentHTML('beforeend', html)
  }
)

// WHEN THE CLIENT GETS CONNECTED, IT WILL GET A CONSOLE NOTIFICATION ABOUT THE STATUS (FIRED IN THE SERVER)
socket.on(
  'sendMessage',
  (message) => console.log(message.text)
)

$messageForm.addEventListener(
  'submit',
  (e) => {
    e.preventDefault()

    const message = $messageFormInput.value    
    $messageFormInput.setAttribute('disabled', 'disabled')
    /*
      WHEN AN USER EMITS THE 'sendMessage', THAT EVENT CAN RETURN A CONFIRMATION MESSAGE OR
      ACKNOWLEDGMENT TO THE USER WHO FIRE THE EVENT. THAT LOGIC IS IN THE THIRD ARGUMENT
    */
    socket.emit(
      'sendMessage',
      message,
      (callbackMsg) => {
        $messageFormInput.value = ''
        $messageFormInput.removeAttribute('disabled')
        console.log(callbackMsg)
      }
    )
  }
)

// WHEN A USER CLICKS ON THE BUTTON TO SEND ITS LOCATION
$locationButton.addEventListener(
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
          },
          (callbackMsg) => console.log(callbackMsg)
        )
      }
    )
  }
)