# Base - Backend Express (Node)
Base Project for generating Backend APIs using Nodejs and Express for HTTP Server and MongoDB for database management.

## Branches
Depending on what version of the base project is needed (and which features), different groups of features have been organized in the next branches:
- `main` - Basic version.
- `mongo` - Simple database management using `mongodb`.
- `jwt` - Simple authentication management using a `mongo` database and `jwt` tokens.
- `postgres` - Simple database management using `postgresql`.

**Current Branch:** `mongo`

## Features
This version of the base project supports the next features:
- Project features:
    - Constants management
    - Error handling
- API features:
    - HTTP server middleware management (using `express`)
    - CORS validation (using `cors`)
    - RESTful endpoints
- Data features:
    - Generic database management (using `mongoose`)
    - Users CRUD

## Requirements
In order to run the project, it is needed to have downloaded and installed the following software:
- Node.js - https://nodejs.org/en/download/
- Nodemon - `npm install -g nodemon` <br>
(recommended, for debugging)
- MongoDB Server - https://www.mongodb.com/try/download/community
- MongoDB Compass - https://www.mongodb.com/products/compass <br>
(recommended, for managing mongo databases)

## Setup & Run
In order to run the project, it is needed to follow the next steps, taking into account they are designed to run the project *locally*. URL's should change otherwise:
1. Clone repository
2. Create database `base-nodejs-express` in `mongo` *(or whatever name is suitable)*
3. Create collection `users` in that database *(or whatever name is suitable)*
4. Create `.env` file in root folder of project with the following variables:
    - PORT=3000 - *(Or whatever is best)*
    - CORS_ORIGIN_WHITELIST=["localhost"] - *(This list allows hosts to connect)*
    - DATABASE_URL="mongodb://localhost:27017/base-nodejs-express" - *(Or whatever port and database name is suitable)*
5. Run `npm install`
6. Run `npm start` for starting server or `npm test` for starting server with `nodemon`


