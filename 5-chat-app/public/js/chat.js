// FIRST YOU GET THE SOCKET.IO FUNCTIONALITY CALLING 'IO()'
const socket = io()

// WHEN THE CLIENT GETS CONNECTED, IT WILL GET A CONSOLE NOTIFICATION ABOUT THE STATUS (FIRED IN THE SERVER)
socket.on(
  'countUpdated',
  (count) => console.log(`Count has been updated to ${count}`)
)

// WHEN YOU CLICK ON BUTTON WITH ID 'increment-button', IT WILL FIRE AN EVENT WHICH WILL BE LISTENED BY THE SERVER, AND THE SERVER WILL FIRE AN EVENT ASWELL
document.querySelector('#increment-button')
  .addEventListener(
    'click',
    () => socket.emit('increment')
  )