const mongoose = require('mongoose')
// STRING FILE TO REDUCE HARDCODED CODE
const strings = require('../configs/strings.js')

mongoose.connect(
  `${strings.connectionUrl}/${strings.db}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true, //ACCESS TO DATA NEEDED
    useFindAndModify: true,
    useUnifiedTopology: true
  }
)