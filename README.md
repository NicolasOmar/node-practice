# Node Practice
Repository created to record my practice learning NodeJs with exercices based on the [Udemy Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2) of [Andrew Mead](https://www.udemy.com/user/andrewmead/).

## Requirements
 - [Node](https://nodejs.org/en/download/) v10.16.3 or above
 - From the fourth excercise and above
   - [MongoDB](https://www.mongodb.com/download-center/community) v4.2.3 or above
   - [Robo 3T](https://robomongo.org/download) to visualize data
   - [Postman](https://www.postman.com/downloads/) to test endopints

## Setup
| App Setup | Command |
| ------ | ------ |
| All | npm run setup-all |
| Notes | npm run setup-notes |
| Weather console | npm run setup-weather-console |
| Weather web | npm run setup-weather-web |
| Task manager | npm run setup-task-manager |
| Chat app | npm run setup-chat-app |

## How to run it
To use any app, you just have to enter into it´s folder and run any of the scripts listed on it´s 'package.json' file. Each command runs with the following structure:
```sh
npm run <command-name>
```
In case you want to run all available commands on a row, execute the following command:
```sh
npm start
```

## Repo Structure & what i learned in each exercise
 - Notes app ('1-notes' folder)
    - Export and import files
    - Npm packages management
    - Improve console prompts with [chalk](https://www.npmjs.com/package/chalk)
    - Use commands with arguments with [yargs](https://www.npmjs.com/package/yargs)
    - Handle JSON data
 - Weather console app ('2-weather-console' folder)
    - Understand API documentation to creater better HTTP requests using [DarkSky](darksky.net/dev) and [MapBox](docs.mapbox.com/api) as examples
    - Handle API data with [request](https://www.npmjs.com/package/request)
    - Callback pattern & abstraction
    - Object destructuring
 - Weather web app ('3-weather-app' folder)
    - Create a local server with [express](https://www.npmjs.com/package/express)
    - Automate server updates with [nodemon](https://www.npmjs.com/package/nodemon)
    - Load dynamic & partial views with [hbs](https://www.npmjs.com/package/hbs) and inject them data
    - Build a JSON HTTP endpoint (using files, packages and knowledge from exercise #2)
    - How to fetch data from the internal url (based on previous point) on a javascript file
    - Use user interaction (by a search form) to make API requests based on user data input and return a result
 - Task manager app ('4-task-manager' folder)
    - How to create a Mongo database and connect from Node with [mongodb](https://www.npmjs.com/package/mongodb)
    - How to handle CRUD operations (Create, Read, Update & Delete) in a Mongo database
    - Improve Mongo CRUD operations using a Object-document mapper with [mongoose](https://www.npmjs.com/package/mongoose)
    - Improve Mongoose model validations with [validator](https://www.npmjs.com/package/validator)
    - Create a REST API structure
    - Use promise chaining to avoid callback nesting
    - How to use Async/Await functions
    - Use Mongoose middleware at Model and endpoint level
    - Use password encryption with [bcryptjs](https://www.npmjs.com/package/bcryptjs)
    - JWT (JSON Web Token) integration with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    - How to test API endpoints with [Postman](https://www.postman.com) (learning about Requests, Collections and Environments)
    - Create documents relationships based on document´s ids, getting them by <Model.populate> and virtual fields
    - Use Timestamps to record create and update dates
    - Add filtering, pagination and sorting in a GET endpoint
    - Upload files using [Multer](https://www.npmjs.com/package/multer)
    - Handle images in an endpoint and save them in a Mongo database
    - Use and implement environment variables with [env-cmd](https://www.npmjs.com/package/env-cmd)
    - Unit testing with [Jest](https://jestjs.io/)
    - Unit testing for API requests with [supertest](https://www.npmjs.com/package/supertest)
 - Chat app ('5-chat-app' folder)
    - WebSocket functionality with [Socket.io](https://www.npmjs.com/package/socket.io)
    - Emit and send events with data (from client to server and visceversa)
    - How to use [Gelocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) and send location on a Google Maps link

## Version (currently v0.4.2)
| Number | Meaning |
| ------ | ------ |
| 0 | Course has been not completed |
| 4 | How many exercices/apps i have completed |
| 2 | How many times i have updated the next exercise/app |