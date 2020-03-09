# Node Practice
Repository created to record my practice learning NodeJs with exercices based on the [Udemy Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2) of [Andrew Mead](https://www.udemy.com/user/andrewmead/).

## Requirements
 - [Node](https://nodejs.org/en/download/) v10.16.3 or above

## Setup
| App Setup | Command |
| ------ | ------ |
| All | npm run setup-all |
| Notes | npm run setup-notes |
| Weather console | npm run setup-weather-console |
| Weather web | npm run setup-weather-web |
| Task manager | npm run setup-task-manager |

## How to use it
To use any app, you just have to enter into it´s folder and run any of the scripts listed on it´s 'package.json' file. Each command runs with the following structure:
```sh
npm run <command-name>
```
In case you want to run all available commands on a row, execute the following command:
```sh
npm start
```

## Repo Structure & Content
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
    - Create, Read, Update & Delete operations on a Mongo database

 ## Version (currently v0.3.0)
| Number | Meaning |
| ------ | ------ |
| 0 | Course has been not completed |
| 3 | How many exercices/apps i have completed |
| 1 | How many times i have updated the next exercise/app |