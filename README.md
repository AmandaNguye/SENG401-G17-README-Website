# SENG401-G17-README-Website
To access out website: please follow this link: https://read-me-seng401.netlify.app/

## Before running

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

## How to run

1. Run the each microservices by using `npm start` in the terminal inside the folder of each microservices. (Will make a script to start all servers at once soon)

2. Run the client code by using `npm start` in the terminal inside the client folder.


## Cloud Compatible Code
Cloud compatible backend codes are stored within `dat/cloud` branch
