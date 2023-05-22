# Events API

This project is built using ExpressJS, Typescript and MongoDB. It follows the "Bulletproof Node.js" architecture and uses joi and celebrate for schema validation, joigoose for converting Joi schemas to Mongoose models and joi-to-typescript for converting Joi schemas to TypeScript interfaces. The API responses are formatted in JSend format.

## Technologies Used

- ExpressJS: A popular Node.js framework for building web applications.
- Typescript: A superset of JavaScript that adds static typing and other features to the language.
- MongoDB: A NoSQL document database used for storing and retrieving data.
- celebrate: A joi validation middleware for Express. 
- joi: A powerful schema description language and data validator for JavaScript.
- joigoose: A package that allows you to use Joi validation for your Mongoose models without the hassle of maintaining two schemas.
- joi-to-typescript: A package for converting Joi Schemas to TypeScript interfaces.

## Architecture

This project follows the "Bulletproof Node.js" architecture, which is a set of guidelines and best practices for building scalable and maintainable Node.js applications. It emphasizes separation of concerns, modularization, and code organization.

## API Responses

This project uses JSend format for returning JSON responses from the API. JSend is a simple and consistent format for communicating the status of API requests and responses. It defines three possible states for a request: "success", "fail", and "error".

## Installation

To use this API, you will need to have Node.js and MongoDB installed on your system. Clone this repository and run `npm install` to install all the necessary dependencies.

## Usage

Start the server by running `npm start`. The API will be available at `http://localhost:3000/api/v3/app`. You can use tools like Postman or cURL to interact with the API endpoints.

Available Endpoints:
- GET `/events?id=:event_id`: Gets an event by its unique id
- GET `/events?type=latest&limit=5&page=1`: Gets events by their recency & paginate results by page number and limit of events per page
- POST `/events`: Creates an event and returns the Id of the event i.e. created
- PUT `/events/:id`: Updates an existing event
- DELETE `/events/:id`: Deletes an event based on its Unique Id
