# Demographics Analyzer API
This API is used to for manage user registration and analyzing images with the [Clarifai API](https://www.clarifai.com/).

## Endpoints
* /register - register a user
* /signin - sign in a user
* /profile/:id - get a profile of a user with `id`
* /imagurl - retrieve the demographic data from the clarifai API
* /image - update the count of analyzed images

## Installation

**Important**: If you want to use the code, you have to set the "API_CLARIFAI_KEY" environment variable to your API key. Alternatively you can set it in `controllers/image.js`. You can get your own API key from [Clarifai](https://www.clarifai.com/) for free.

### Steps:
1. npm run install
2. npm run start

This API uses postgreSQL for the database. If you want to use another database you have to update the information in `server.js`.
