const { calculateTip } = require('../test/math')

test(
  'Math test - Calculate tip without default percentage',
  () => {
    const total = calculateTip(10, 30)
    expect(total).toBe(13)
  }
)

test(
  'Math test - Calculate tip with default percentage',
  () => {
    const total = calculateTip(10)
    expect(total).toBe(10.1)
  }
)