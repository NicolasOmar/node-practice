module.exports = {
  calculateTip: (expense, percentage = 1) => expense + (expense * (percentage / 100))
}