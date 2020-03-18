module.exports = {
  calculateTip: (expense, percentage = 10) => expense + (expense * (percentage / 100))
}