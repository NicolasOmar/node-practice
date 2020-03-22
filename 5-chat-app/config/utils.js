module.exports = {
  returnMsg: (msg) => {
    return { text: msg, createdAt: new Date().getTime() }
  }
}