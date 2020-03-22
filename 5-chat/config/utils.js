module.exports = {
  returnMsg: (username, text) => {
    return {
      username,
      text,
      createdAt: new Date().getTime()
    }
  }
}