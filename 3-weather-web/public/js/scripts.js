const weatherForm = document.querySelector('form')
const searchData = document.querySelector('input')
const responseHtml = document.querySelector('#result-paragraph')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  responseHtml.textContent = 'Loading response...'

  fetch(`http://localhost:3000/weather?address=${searchData.value}`)
    .then(
      response => {
        response.json()
          .then(
            data => {
              const displayResult = data.error ?
                `Error: ${data.error}` : `Location: ${data.location}. Forecast: ${data.summary}`
              responseHtml.textContent = displayResult
            }
          )
      }
    )
})