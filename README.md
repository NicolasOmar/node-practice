# Node Practice
Repository created to record my practice learning NodeJs with exercises based on the [Udemy Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2) of [Andrew Mead](https://www.udemy.com/user/andrewmead/).

## Requirements
 - [Node](https://nodejs.org/en/download/) v10.16.3 or above
 - For fourth exercise only
   - [MongoDB](https://www.mongodb.com/download-center/community) v4.2.3 or above
   - [Robo 3T](https://robomongo.org/download) to visualize data
   - [Postman](https://www.postman.com/downloads/) to test endopints

## Setup
After cloning the repo, go to the created folder and install the node packages.
```sh
git clone https://github.com/NicolasOmar/node-practice.git
cd node-practice
npm run setup-all
```
`setup-all` is the command to install all the projects, but if you want to do it one by one, you can change that last line for one of the following:
| App Setup | Command |
| ------ | ------ |
| All | `npm run setup-all` |
| Notes | `npm run setup-notes` |
| Weather console | `npm run setup-weather-console` |
| Weather web | `npm run setup-weather-web` |
| Task manager | `npm run setup-task-manager` |
| Chat | `npm run setup-chat` |

## How to run it
To use any app, you just have to enter into its folder and run any of the scripts listed on its 'package.json' file. Each command runs with the following structure:
```sh
npm run <command-name>
```
In case you want to run all available commands on a row, execute the following command:
```sh
npm start
```

## Repo Structure & what i learned in each exercise
 - Notes app (`1-notes` folder)
    - Export and import files
    - Npm packages management
    - Improve console prompts with [chalk](https://www.npmjs.com/package/chalk)
    - Use commands with arguments with [yargs](https://www.npmjs.com/package/yargs)
    - Handle JSON data
 - Weather console app (`2-weather-console` folder)
    - Understand API documentation to creater better HTTP requests using [DarkSky](darksky.net/dev) and [MapBox](docs.mapbox.com/api) as examples
    - Handle API data with [request](https://www.npmjs.com/package/request)
    - Callback pattern & abstraction
    - Object destructuring
 - Weather web app (`3-weather-app` folder)
    - Create a local server with [express](https://www.npmjs.com/package/express)
    - Automate server updates with [nodemon](https://www.npmjs.com/package/nodemon)
    - Load dynamic & partial views with [hbs](https://www.npmjs.com/package/hbs) and inject them data
    - Build a JSON HTTP endpoint (using files, packages and knowledge from exercise #2)
    - How to fetch data from the internal url (based on previous point) on a javascript file
    - Use user interaction (by a search form) to make API requests based on user data input and return a result
 - Task manager app (`4-task-manager` folder)
    - How to create a Mongo database and connect it in Node with [mongodb](https://www.npmjs.com/package/mongodb)
    - How to handle CRUD operations (Create, Read, Update & Delete) in a Mongo database
    - Improve Mongo CRUD operations using a Object-document mapper with [mongoose](https://www.npmjs.com/package/mongoose)
    - Improve Mongoose model validations with [validator](https://www.npmjs.com/package/validator)
    - Create a REST API structure
    - Use promise chaining to avoid callback nesting
    - How to use `Async/Await` functions
    - Use Mongoose middleware at Model and endpoint level
    - Use password encryption with [bcryptjs](https://www.npmjs.com/package/bcryptjs)
    - JWT (JSON Web Token) integration with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    - How to test API endpoints with [Postman](https://www.postman.com) (learning about Requests, Collections and Environments)
    - Create documents relationships based on document´s ids, getting them by `Model.populate` and virtual fields
    - Use `timestamps` to record create and update dates
    - Add filtering, pagination and sorting in a `GET` endpoint
    - Upload files using [Multer](https://www.npmjs.com/package/multer)
    - Handle images in an endpoint and save them in a Mongo database
    - Use and implement environment variables with [env-cmd](https://www.npmjs.com/package/env-cmd)
    - Unit testing with [Jest](https://jestjs.io/)
    - API requests Unit testing with [supertest](https://www.npmjs.com/package/supertest)
 - Chat app (`5-chat` folder)
    - Create a project using WebSocket protocol with [Socket.io](https://www.npmjs.com/package/socket.io)
    - Emit and send events with data (from client to server and visceversa)
    - How to use [Gelocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) and send location on a Google Maps link
    - Event acknowledgments
    - Render messages with [Mustache](https://www.npmjs.com/package/mustache)
    - Associate users in different channels/rooms and handle messages for specific channels

## Version (currently v1.0.0)
**This course has been completed on 22/03/2020 - [Certificate](https://www.udemy.com/certificate/UC-8d302815-dafb-41c0-89f3-966ca887aa4c/)**

## Other Practice Repos
| React | Angular | GraphQL | Typescript | HTML & CSS |
| :---: | :---: | :---: | :---: | :---: |
| [<img src="https://cdn.svgporn.com/logos/react.svg" title="React Practice Repo" alt="React Practice Repo" width="48px">](https://github.com/NicolasOmar/react-practice) | [<img src="https://cdn.svgporn.com/logos/angular-icon.svg" title="Angular Practice Repo" alt="Angular Practice Repo" width="48px">](https://github.com/NicolasOmar/angular-practice) | [<img src="https://cdn.svgporn.com/logos/graphql.svg" title="GraphQL Practice Repo" alt="GraphQL Practice Repo" width="48px">](https://github.com/NicolasOmar/graphql-practice) | [<img src="https://cdn.svgporn.com/logos/typescript-icon.svg" title="Typescript Practice Repo" alt="Typescript Practice Repo" width="48px">](https://github.com/NicolasOmar/typescript-practice) | [<img src="https://cdn.svgporn.com/logos/html-5.svg" title="HTML and CSS Practice Repo" alt="HTML and CSS Practice Repo" width="48px">](https://github.com/NicolasOmar/html-css-practice) |