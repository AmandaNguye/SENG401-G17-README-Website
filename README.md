# SENG401-G17-README-Website
To access out website: please follow this link: https://read-me-seng401.netlify.app/

Below is steps to run the project locally on your computer. Note: the frontend has been linked to the cloud backend so you do not need to run the backend to run the front end

## Before running the Backend

Make sure you have a .env file in each microservice and populate it with:

### User
PORT = 5000

CONNECTION_URL = mongodb+srv://'username':'password'@cluster0.mw5kc.mongodb.net/seng401?retryWrites=true&w=majority

JWT_SECRET = (we will get our JWT hash key to make sure everyone has the same key)

### Post
PORT = 5001

CONNECTION_URL = mongodb+srv://'username':'password'@cluster0.mw5kc.mongodb.net/seng401?retryWrites=true&w=majority

JWT_SECRET = (we will get our JWT hash key to make sure everyone has the same key)

### Comment
PORT = 5002

CONNECTION_URL = mongodb+srv://'username':'password'@cluster0.mw5kc.mongodb.net/seng401?retryWrites=true&w=majority

JWT_SECRET = (we will get our JWT hash key to make sure everyone has the same key)

### API Gateway
PORT = 5005

USER_URL = http://localhost:5000

POST_URL = http://localhost:5001

COMMENT_URL = http://localhost:5002

JWT_SECRET = (we will get our JWT hash key to make sure everyone has the same key)

## How to run the back end
1. Run `npm install` in each of the service folder
3. Run `npm start` in the each of the microservice folder

## How to run the front end

1. Run `npm install` in the client folder
2. Run the client code by using `npm start` in the terminal inside the client folder.


## Cloud Compatible Code
Cloud compatible backend codes are stored within `dat/cloud` branch
