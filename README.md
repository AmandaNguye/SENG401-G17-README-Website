# SENG401-G17-README-Website

## Before running

Make sure you have a .env file in each microservice and populate it with:

PORT = 5000

CONNECTION_URL = mongodb+srv://'username':'password'@cluster0.mw5kc.mongodb.net/seng401?retryWrites=true&w=majority

JWT_SECRET = (we will get our JWT hash key to make sure everyone has the same key)

## How to run

1. Run the each microservices by using `npm start` in the terminal inside the folder of each microservices. (Will make a script to start all servers at once soon)

2. Run the client code by using `npm start` in the terminal inside the client folder.
