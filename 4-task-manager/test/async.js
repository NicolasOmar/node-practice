module.exports = {
  add: (number, otherNumber) => {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(number + otherNumber)
        }, 2000)
      }
    )
  }
}