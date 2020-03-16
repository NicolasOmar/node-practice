const mongoose = require('mongoose')
// STRING FILE TO REDUCE HARDCODED CODE
const dataBase = require('../../configs/db')

mongoose.connect(
  `${dataBase.connectionUrl}/${dataBase.name}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true, //ACCESS TO DATA NEEDED
    useFindAndModify: true,
    useUnifiedTopology: true
  }
)