const chalk = require('chalk')
const app = require('./app')
const port = process.env.PORT

app.listen(
  port,
  () => console.log(chalk.white.bold.bgGreen(`Server up and working on port ${port}`))
)