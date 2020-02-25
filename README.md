# Node Practice
Repository created to record my practice learning NodeJs with exercices based on the [Udemy Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2) of [Andrew Mead](https://www.udemy.com/user/andrewmead/).

## Requirements
 - [Node](https://nodejs.org/en/download/) v10.16.3 or above

## Setup
| App Setup | Command |
| ------ | ------ |
| All | npm run setup-all |
| Notes | npm run setup-notes |
| Weather | npm run setup-weather |

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
 - Weather app ('2-weather' folder)
    - Understand API documentation to creater better HTTP requests using [DarkSky](darksky.net/dev) and [MapBox](docs.mapbox.com/api) as examples
    - Handle API data with [request](https://www.npmjs.com/package/request)
    - Callback pattern & abstraction

 ## Version (currently v0.1.4)
| Number | Meaning |
| ------ | ------ |
| 0 | Course has been not completed |
| 1 | How many exercises/app i have completed |
| 4 | How many times i have updated the next exercice/app |