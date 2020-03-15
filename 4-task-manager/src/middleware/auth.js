const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (request, response, next) => {
  try {
    const token = request.header('Authorization').replace('Bearer ', '')
    const decodedToken = jwt.verify(token, 'iamtestingthelibrary')
    const finded = await User.findOne({ _id: decodedToken._id, 'tokens.token': token })

    if (!finded) {
      throw new Error()
    }
    
    request.token = token
    request.user = finded
    next()     
  } catch (error) {
    response.status(401).send({ ...error, msg: 'Please authenticate'})
  }
}

module.exports = auth