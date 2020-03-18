const { calculateTip } = require('../test/math')

test(
  'Math test - Calculate tip without default percentage - $10 total to $13 with 30% tip',
  () => {
    const total = calculateTip(10, 30)
    expect(total).toBe(13)
  }
)

test(
  'Math test - Calculate tip with default percentage - $10 total to $11 with default tip (10%)',
  () => {
    const total = calculateTip(10)
    expect(total).toBe(11)
  }
)