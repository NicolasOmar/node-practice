const { fahrenheitToCelsius, celsiusToFahrenheit } = require('../test/temp')

test(
  'Temperature - Calculate celsius to Fahrenheit - 0 F to 32 C',
  () => {
    const final = celsiusToFahrenheit(0)

    expect(final).toBe(32)
  }
)

test(
  'Temperature - Calculate celsius to Fahrenheit - 32 F to 0 C',
  () => {
    const final = fahrenheitToCelsius(32)

    expect(final).toBe(0)
  }
)